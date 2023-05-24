const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    console.log(cubeService.getAll());
    res.render('create');
});

router.get('/details/:cubeId', (req, res) => {
    const cube = cubeService.getOne(req.params.cubeId);
    res.render('details', { cube });
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeService.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel) });
    res.redirect('/');
});

module.exports = router;