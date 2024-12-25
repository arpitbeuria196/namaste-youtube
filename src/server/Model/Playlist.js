const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videos:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
    ],
    isPublic:
    {
        Boolean: true,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Playlist",PlaylistSchema);