const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller= require("../controllers/documentController")
const router = express.Router();
const upload = path.join(__dirname, '../upload');


router.post('/create', controller.create)
router.get('/list', controller.list)

module.exports = router;