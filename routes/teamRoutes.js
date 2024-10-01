const express = require('express');
const router = express.Router();
const controller= require("../controllers/teamControllers.js")

router.post('/create', controller.create)
router.get('/list', controller.list)
router.get('/listId', controller.listId)
router.post('/delete', controller.delete)


module.exports = router;
