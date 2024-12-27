const Video = require("../Model/Video");
const User = require("../Model/User");


//Upload Video
exports.uploadVideo =  async (req,res)=>
{
    try {
        
        const {title,description,videoUrl,thumbnailUrl} = req.body;

        const newVideo = new Video({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            channel : req.user._id
        });

        await newVideo.save();

        res.status(201).json(newVideo);

    } catch (err) {
        
        res.status(500).json({ error: err.message });
    }
}

//get All Videos
exports.getAllVideos = async (req,res)=>
{
    try {
        const videos = await Video.find().populate('channel', 'userName');
        res.json(videos);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//LikedVideo

exports.likeVideo = async (req,res) =>
{
    try {

        const videoId = req.params.videoId;
        
        const video = await Video.findById(videoId);

        if(!video)
        {
            return res.status(400).json({message: "Video Doesn't exist"});
        }

        if (!video.likes.includes(req.user._id))
        {
            video.likes.push(req.user._id);
            await video.save();
        }
        res.json(video);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Comments On Video

exports.commentVideo = async (req,res)=>
{
    try {
        
        const existingVideo = await Video.findById(req.params.videoId);
        if(existingVideo)
        {
            return res.status(404).json({ message: "Video not found" });
        }

        const{text} = req.body;

        existingVideo.comments.push({ user: req.user._id, text });

        await existingVideo.save();

        res.json(existingVideo);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




