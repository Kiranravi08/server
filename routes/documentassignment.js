const express = require('express');
const router = express.Router
const controller= require("../controllers/documentassignmentController")

router.post('/create', controller.create)

module.exports = router;