const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const Cube = require('../models/Cube');

router.get('/create', (req, res) => {
    console.log(req.user);
    res.render('cube/create');
});

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', { cube });
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), owner: req.user._id });
    res.redirect('/');
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getOne(cubeId).lean();
    const accessories = await accessoryService.getAvailableAccessories(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId;
    const { accessory: accessoryId } = req.body;

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    
    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    await cubeService.edit(req.params.cubeId, {name, description, imageUrl, difficultyLevel});

    res.redirect(`/cubes/details/${req.params.cubeId}`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    res.render('cube/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);
    res.redirect('/');
});

module.exports = router;