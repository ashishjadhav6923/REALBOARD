import { useState } from "react";
import { useSelector } from "react-redux";

const RoomManager = () => {
  //its incomplete component, will be implemented on next version of app
  const [inputRoomId, setInputRoomId] = useState("");
  const themeColor = useSelector((state) => state.theme.themeColor);

  return (
    <div className={`${
        themeColor == "light"
          ? "bg-white border-slate-200 border-1 "
          : "bg-[#232329] text-white"
      } absolute top-18 right-4 justify-between items-center rounded-xl shadow-md flex flex-col z-50`}>
      <input
      className="p-2 rounded-xl"
        type="text"
        value={inputRoomId}
        onChange={(e) => setInputRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button
        className={`${
          themeColor == "light" ? "hover:bg-gray-200" : "hover:bg-gray-500"
        } rounded-xl w-full cursor-pointer text-start p-2`}
      >
        Create Room
      </button>
      <button
        className={`${
          themeColor == "light" ? "hover:bg-gray-200" : "hover:bg-gray-500"
        } rounded-xl w-full cursor-pointer text-start p-2`}
      >
        Join Room
      </button>
    </div>
  );
};

export default RoomManager;
