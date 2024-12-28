const { createPlaylist, addVideoToPlaylist } = require("../Controller/playListController"); 
const auth = require("../middleware_temp/authMiddleware");
const router = require('express').Router();

router.post('/',auth,createPlaylist);
router.post('/add-video',auth,addVideoToPlaylist);

module.exports = router;