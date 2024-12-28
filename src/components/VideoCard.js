import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info || {};
  const { channelTitle, title, thumbnails } = snippet || {};

  return (
    <div className="p-2 m-2 w-72 shadow-lg text-black">
      {thumbnails ? (
        <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
      ) : (
        <div className="h-48 bg-gray-200 animate-pulse"></div>
      )}
      <ul>
        <li className="font-bold py-2">{title || "No Title Available"}</li>
        <li>{channelTitle || "Unknown Channel"}</li>
        <li>{statistics?.viewCount ? `${statistics.viewCount} views` : "No Views Available"}</li>
      </ul>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  return (
    <div className="p-1 m-1 border border-red-900">
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
