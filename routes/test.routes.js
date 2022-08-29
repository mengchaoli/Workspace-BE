// template for adding middlwares to routes

const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const authControllers = require('../controllers/auth.controllers');

router.get('/api/test/signup', [authJwt.verifyToken], authControllers.signup);

module.exports = router;
