import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/Constants";
import { cachesAtRedux } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const cacheSelector = useSelector((store) => store.search);

  const toggleHandle = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    if (cacheSelector[searchQuery]) {
      setSuggestions(cacheSelector[searchQuery]);
    } else {
      const debounceFetch = setTimeout(() => {
        if (searchQuery) fetchSearchAPI();
      }, 300);
      return () => clearTimeout(debounceFetch);
    }
  }, [searchQuery]);

  const fetchSearchAPI = async () => {
    try {
      const response = await axios.get(YOUTUBE_SEARCH_API + searchQuery);
      const fetchedSuggestions = response.data[1] || [];
      dispatch(
        cachesAtRedux({
          searchQuery,
          data: fetchedSuggestions,
        })
      );
      setSuggestions(fetchedSuggestions);
    } catch (error) {
      console.error("Error While Fetching API:", error.message);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg relative">
      {/* Left Section */}
      <div className="flex items-center col-span-1">
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          onClick={toggleHandle}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="YouTube Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          />
        </a>
      </div>

      {/* Middle Section */}
      <div className="col-span-10 flex flex-col items-center">
        <div className="flex w-full">
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full focus:outline-none text-black"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100 flex items-center justify-center">
            <FaSearch className="text-gray-600" />
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-16 bg-white py-2 px-2 pr-96 max-w-full shadow-lg rounded-lg border border-gray-100 z-50 text-black">
            <ul>
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  className="flex items-center py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer"
                >
                  <IoSearchOutline className="mr-2 text-gray-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="col-span-1 flex items-center justify-end">
        <img
          className="h-8"
          alt="User"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
