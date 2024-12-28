import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../utils/appSlice';
import { useDispatch } from 'react-redux';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {

    const [searchParams] = useSearchParams(); 
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(closeMenu());
    },[])

  return (
    <div>
         <div className="flex justify-center items-center h-screen">
  <iframe
    className="w-full h-3/4"
    src={"https://www.youtube.com/embed/" + searchParams.get("v")}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
  <LiveChat/>
</div>
<CommentsContainer/>
    </div>
   


  )
}

export default WatchPage
