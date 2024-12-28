import React from "react";
import { FaHome, FaMusic, FaGamepad, FaFilm, FaVideo, FaStream } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import { GiTennisRacket } from "react-icons/gi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const menuSelector = useSelector((store) => store.app.isMenuOpen);

  return menuSelector ? (
    <div className="p-5 shadow-lg w-48 text-black">
      {/* Main Navigation */}
      <ul>
        <li className="flex items-center py-2">
          <FaHome className="mr-2" /> Home
        </li>
        <li className="flex items-center py-2">
          <FaStream className="mr-2" /> Shorts
        </li>
        <li className="flex items-center py-2">
          <FaVideo className="mr-2" /> Videos
        </li>
        <li className="flex items-center py-2">
          <MdLiveTv className="mr-2" /> Live
        </li>
      </ul>

      {/* Subscriptions Section */}
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li className="flex items-center py-2">
          <FaMusic className="mr-2" /> Music
        </li>
        <li className="flex items-center py-2">
          <GiTennisRacket className="mr-2" /> Sports
        </li>
        <li className="flex items-center py-2">
          <FaGamepad className="mr-2" /> Gaming
        </li>
        <li className="flex items-center py-2">
          <FaFilm className="mr-2" /> Movies
        </li>
      </ul>

      {/* Watch Later Section */}
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li className="flex items-center py-2">
          <FaMusic className="mr-2" /> Music
        </li>
        <li className="flex items-center py-2">
          <GiTennisRacket className="mr-2" /> Sports
        </li>
        <li className="flex items-center py-2">
          <FaGamepad className="mr-2" /> Gaming
        </li>
        <li className="flex items-center py-2">
          <FaFilm className="mr-2" /> Movies
        </li>
      </ul>
    </div>
  ) : null;
};

export default Sidebar;
