const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const blogRoutes = require('./routes/blog');

require('dotenv').config();
require('./config/passport');

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true, // allow cookies & headers like CSRF
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// Auth Routes
app.use('/api/users', authRoutes);
// Category Route
app.use('/api/categories', categoryRoutes);
// Blog Route
app.use('/api/blog', blogRoutes);

app.listen(process.env.PORT, async () => {
    console.log(`Server Started at ${process.env.PORT}`)
});