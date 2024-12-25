const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        default:''
    },
    videoUrl:
    {
        type:String,
        required: true
    },
    thumbnailUrl:
    {
        type: String,
    },
    channel:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    comments: [

       {
          user: {type: mongoose.Schema.Types.ObjectId,ref:"User"},
          text: String,
          createdAt : { type: Date, default: Date.now },
       }
    ]
    
},
{timestamps:true}
)

module.exports = mongoose.model(videoSchema,"Video");