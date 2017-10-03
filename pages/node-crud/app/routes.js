const express = require('express');
const router = express.Router();
const exampleController = require('./controllers/example.controller');
const createController = require('./controllers/create.controller');
const readController = require('./controllers/read.controller');
const updateController = require('./controllers/update.controller');
const deleteController = require('./controllers/delete.controller');

module.exports = router;

router.get('/', exampleController.showHome);
router.post('/', exampleController.addItem);
router.delete('/', exampleController.removeItem);
router.put('/', exampleController.updateItem);
router.get('/getData', exampleController.getData);



router.get('/create', createController.showHome);
router.get('/read', readController.showHome);
router.get('/update', updateController.showHome);
router.get('/delete', deleteController.showHome);