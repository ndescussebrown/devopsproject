const express = require('express');
const record_Controller = require('../controllers/recordcontroller');
const recordRouter = express.Router();


// Add or Update Record
recordRouter.get('/record/add', record_Controller.record_addupdate_get);

// Process Add or Update Record
recordRouter.post('/record/add', record_Controller.record_addupdate);

//Search page
recordRouter.get('/', record_Controller.record_search_get);

//Process Search
recordRouter.post('/record/search', record_Controller.record_search);

// Delete Record
recordRouter.delete('/record/delete/:id', record_Controller.record_delete);

module.exports = recordRouter;
