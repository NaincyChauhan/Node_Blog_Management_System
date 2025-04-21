const { validationResult } = require("express-validator");
const db = require('../models');
const jwt = require('jsonwebtoken');
const User = db.User;

const bcrypt = require('bcryptjs');

require('dotenv').config();

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // genrate user token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME
        }
    )

    res.json({
        message: "Logged in successfully.", 
        data: {
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email, 
            profile_image: user.profile_image, 
            fullname: user.fullname
        },
        token: token,
    });
}

exports.logout = (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Logged out Successfully" });
    })
}

exports.profile = (req, res) => {
    const { fullname, firstName, lastName, email, profile_image } = req.user;
    res.status(201).json({
        message: "Success",
        data: {
            firstName, lastName, email, profile_image, fullname
        }
    });
}