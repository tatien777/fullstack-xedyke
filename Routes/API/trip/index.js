const express = require('express');
const router = express.Router();
const userController = require('./controller')
const jwt = require('jsonwebtoken')
const {authenticate,authorizie} = require('../user')
const {uploadImage} = require('../../../middlewares/uploadImage');
/// GET {host}/api/trips (da viet)
/// GET {host}/api/trips/:id 
/// POST {host}/api/trips/ (da viet)
/// UPDATE {host}/api/trips/:id
/// DELETE {host}/api/trips/:id 

