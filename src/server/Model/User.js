const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    userName : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    channelName: {
        type: String,
        default: '', //If user chooses o create a channel
    },
    likedVideos :
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    savedVideos :
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
},

{timestamps:true}
)


module.exports = mongoose.model("User",userSchema);