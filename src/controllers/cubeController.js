const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    console.log(cubeService.getAll());
    res.render('create');
});

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }
    
    res.render('details', { cube });
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel) });
    res.redirect('/');
});

router.get('/:cubeId/attach-accessory', (req, res) => {
    res.render('accessory/attach');
});

module.exports = router;