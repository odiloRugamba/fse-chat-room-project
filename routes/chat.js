//importing node core files


//importing third party packages
const express = require('express');

//importing my files
const chatControllers = require('../controllers/chat');

const router = express.Router();
router.post('/send-message', chatControllers.postMessage);
router.get('/send-message', chatControllers.postMessage);
router.get('/', chatControllers.getChat);

module.exports = router;