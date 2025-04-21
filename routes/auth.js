const { Router } = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const { register, login, logout, profile } = require('../controllers/auth');
const authenticateJWT = require('../middlewares/authenticateJWT');
const router = Router();


const validateRegister = [
    body('firstName').notEmpty().withMessage('First name is required').trim().escape(),
    body('lastName').notEmpty().withMessage('Last name is required').trim().escape(),
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.post('/register', validateRegister, register);

router.post('/login', login)

router.get('/logout', logout);

router.get('/profile', authenticateJWT, profile)

module.exports = router;