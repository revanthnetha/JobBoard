import { useState, useEffect } from "react";
import icons from "../assets/index";

const Appbar = () => {
  const { logo, home } = icons;
  const [token, setToken] = useState<string | null>(null);

  // Function to update token state from localStorage
  const updateToken = () => {
    const storedToken = localStorage.getItem("jwtToken");
    setToken(storedToken);
  };

  useEffect(() => {
    // Set token when the component mounts
    updateToken();

    // Listen for 'storage' event to update the token when localStorage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "jwtToken") {
        updateToken();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up event listener when the component unmounts
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between px-8 py-4 border-b">
      <div className="w-[125px] h-[23px] flex justify-center flex-col">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-[#576474] cursor-pointer">Contact</div>
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
            <li className="w-12 h-8 cursor-pointer flex">
              <img src={home} alt="Home" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Appbar;
