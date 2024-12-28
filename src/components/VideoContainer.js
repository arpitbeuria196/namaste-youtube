import axios from "axios";
import React, { useEffect, useState } from "react";
import { YouTube_API } from "../utils/Constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(YouTube_API);
      if (response?.data?.items) {
        setVideos(response.data.items);
      } else {
        throw new Error("Invalid API Response");
      }
    } catch (error) {
      console.error("Error While Fetching API:", error.message);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex flex-wrap">
      {videos.length > 0 && <AdVideoCard info={videos[0]} />}
      {videos.map((video, index) => (
        <Link key={video.id?.videoId || index} to={`/watch?v=${video.id?.videoId || video.id}`}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
