import axios from 'axios';
import React, { useEffect } from 'react'
import { YouTube_API } from '../utils/Constants';
import { useState } from 'react';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { adVideoCard } from './VideoCard';

const VideoContainer = () => {

    const[videos,setVideos] = useState([]);

   useEffect(()=>{
    fetchData();
    
   },[]) 

   const fetchData = async ()=>
   {
    try {
        const data = await  axios.get(YouTube_API);
        setVideos(data.data.items);
        console.log(data);
    } catch (error) {
        console.log("Error While Fetching API",error.message);   
    }
   }
  return (
    <div className='flex flex-wrap'>
       <adVideoCard info = {videos[0]}/> 
      {videos.map((video,index)=>
      <Link key={video.id} to={"/watch?v=" + video.id}>
        <VideoCard
            key={index}
            info = {video}
    />

      </Link>
    
    )}
    </div>
  )
}

export default VideoContainer
