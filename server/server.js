const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./Config/dbConfig");
const authRoutes = require("./Routes/authRoutes");
const videoRoutes = require("./Routes/videoRoutes");
const playlistRoutes = require("./Routes/playlistRoutes");



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser);

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/playlists', playlistRoutes);

connectDB();


app.listen(8000,()=>
{
    console.log(`Server running on port 8000`);  
})



