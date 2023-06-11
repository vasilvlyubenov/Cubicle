const router = require('express').Router();
const userService = require('../services/userService');

const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await userService.register({ username, password, repeatPassword });

        res.redirect('login');
    } catch (error) {
        const errorMessages = extractErrorMessages(error);
        res.status(400).render('users/register', { errorMessages: errorMessages });
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const token = await userService.login(username, password);

        res.cookie('auth', token, { httpOnly: true });
    
        res.redirect('/');
    } catch (error) {
        next(error);
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;