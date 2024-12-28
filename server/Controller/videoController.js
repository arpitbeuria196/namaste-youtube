const Video = require("../Model/Video");
const User = require("../Model/User");


//add Video
export const addVideo =  async (req,res)=>
{
    try {
        
        const newVideo = new Video({ userId: req.user.id, ...req.body });
        const savedVideo = await newVideo.save();

        res.status(201).json(savedVideo);

    } catch (err) {
        
        res.status(500).json({ error: err.message });
    }
}


//update Video
export const updateVideo = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) return res.status(500).json("Video not Found");
      if (req.user.id === video.userId) {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else {
        return  res.status(500).json("You can update only your video!")
      }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //delete Video
  export const deleteVideo = async (req, res) => 
{
    try {
      const video = await Video.findById(req.params.id);
      if (!video) return ;
      if (req.user.id === video.userId) {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return res.status(500).json("You can update only your video!");
      }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//get  Video
export const getVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //add view
  export const addView = async (req,res)=>
  {
    try {
        
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }, 
        })
        res.status(200).json("The view has been increased.");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
  //random videos
  export const random = async (req, res) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //trend
  export const trend = async (req, res, next) => {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //subscriber
  export const sub = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //getByTag
  export const getByTag = async (req, res) => {
    const tags = req.query.tags.split(",");
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //search
  export const search = async (req, res) => {
    const query = req.query.q;
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
  };










