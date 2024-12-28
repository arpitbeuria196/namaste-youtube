import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useState } from "react";
import axios from "axios";
import { YOUTUBE_SEARCH_API } from "../utils/Constants";

const Head = () => {
  const dispatch = useDispatch();
  const[searchQuery,setSearchQuery] = useState("");
  const[suggestions,setSuggestions] = useState([]);
  const[showSuggestions,setShowSuggestions] = useState(true);

  const toggleHandle = () => {
    dispatch(toggleMenu());
  };

  useEffect(()=>{

  const timer =  setTimeout(()=>{
      fetchSearchAPI();
    },200)

    return ()=>{
      clearTimeout(timer);
    }

  },[searchQuery])

  
  const fetchSearchAPI = async () =>
  {
    try {
      const data = await axios.get(YOUTUBE_SEARCH_API +searchQuery);
      //console.log(data);
      setSuggestions(data[1]);
      console.log(suggestions)
    } catch (error) {
      console.log("Error While Fetching API");
    }
  }

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      {/* Left Section: Menu and Logo */}
      <div className="flex items-center col-span-1">
        {/* Hamburger Menu Icon */}
        <img
          className="h-8 cursor-pointer"
          alt="menu"
          onClick={toggleHandle}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        {/* YouTube Logo */}
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="YouTube Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="col-span-10 flex items-center px-10">
        <input
          className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full focus:outline-none text-black"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={()=>setShowSuggestions(true)}
          onBlur={()=>setShowSuggestions(false)}
        />
        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100 flex items-center justify-center">
          <FaSearch className="text-gray-600" />
        </button>
      </div>

            { showSuggestions  && (

      <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
          <ul>
            {suggestions.map((s) => (
              <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                🔍 {s}
              </li>
            ))}
          </ul>
        </div>
      )

      }

      {/* Right Section: User Icon */}
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
