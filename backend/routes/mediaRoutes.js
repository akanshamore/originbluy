const express = require('express');
const { uploadMedia, getMedia, deleteMedia } = require('../controllers/mediaController');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/upload', uploadMedia);
router.get('/', getMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
