import React from "react";
import icons from "../assets/index";

const Appbar = () => {
  const { logo, home } = icons;
  const token = true;
  // localStorage.getItem("jwtToken")
  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between p-8 border-b">
      <div className="w-[165px] h-[43px]">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-[#576474] cursor-pointer text">Contact</div>
        {token && (
          <>
            <button
              onClick={handleSignOut}
              className="bg-[#0B66EF] text-white px-4 py-2 rounded-md"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
      {token && (
        <div className="fixed top-24 left-0 w-14 h-full border-r shadow-md p-4 z-50">
          <ul>
            <li className=" w-12 h-8 cursor-pointer flex">
              <img src={home} alt="img" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Appbar;
