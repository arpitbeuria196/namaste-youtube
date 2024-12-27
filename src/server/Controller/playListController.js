const Playlist = require("../Model/Playlist");

//create Playlist
exports.createPlaylist = async (req,res)=>
{
    try {
        const{name,isPublic} = req.body;
        const newPlaylist = new Playlist({
            name,
            user: req.user._id,
            isPublic
        })

        await newPlaylist.save();
        res.status(201).json(newPlaylist)
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//add Video to the playlist
exports.addVideoPlaylist = async (req,res)=>
{

    try {
        
        const{ playlistId,videoId } = req.body;

        const existingPlaylist = await Playlist.findById(playlistId);

        if(!existingPlaylist)
        {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if(existingPlaylist.videos.includes(videoId))
        {
            return res.status(400).json({ message: "Video is already in the playlist" }); 
        }

        existingPlaylist.videos.push(videoId);

        await existingPlaylist.save();

        res.status(200).json(existingPlaylist);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

