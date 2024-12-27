const mongoose = require("mongoose");

module.exports = async ()=>
{
    try {
        
        mongoose.connect("mongodb+srv://arpit196:arpitbeuria@cluster0.uohce.mongodb.net/youtubeDB",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongo Connected");
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
}




