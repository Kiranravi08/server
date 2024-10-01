const express = require('express');
const router = express.Router();
const controller= require("../controllers/userController.js")

router.post('/create', controller.create)
router.get('/list', controller.List)
router.post('/delete', controller.delete)

module.exports = router;