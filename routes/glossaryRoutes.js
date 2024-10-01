const express = require('express');
const router = express.Router();

const controller= require("../controllers/glossaryController")

router.post('/create', controller.create); 
router.get('/list', controller.list);
router.post('/delete', controller.delete);

module.exports = router;