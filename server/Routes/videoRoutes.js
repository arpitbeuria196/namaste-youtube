const router = require('express').Router();
const auth = require("../middleware_temp/authMiddleware");
const { uploadVideo, getAllVideos, likeVideo, commentOnVideo } = require('../Controller/videoController'); // If located in 'Controller'


// Protected routes
router.post('/upload', auth, uploadVideo);
router.get('/', getAllVideos);
router.post('/:videoId/like', auth, likeVideo);
router.post('/:videoId/comment', auth, commentOnVideo);

module.exports = router;
