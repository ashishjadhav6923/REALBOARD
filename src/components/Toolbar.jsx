import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { PiSquareThin } from "react-icons/pi";
import { PiTriangleThin } from "react-icons/pi";
import { PiDiamondThin } from "react-icons/pi";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { GiCircle } from "react-icons/gi";
import { CiEraser } from "react-icons/ci";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { PiTextAaThin } from "react-icons/pi";
import { PiTrashThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { PiArrowUUpLeftThin } from "react-icons/pi";
import { PiArrowUUpRightThin } from "react-icons/pi";

const Toolbar = ({ setisMenuActive, isMenuActive }) => {
  const icons = [
    { Component: PiPencilSimpleLineThin },
    { Component: PiSquareThin },
    { Component: PiTriangleThin },
    { Component: PiDiamondThin },
    { Component: TfiLayoutLineSolid },
    { Component: GiCircle },
    { Component: PiTextAaThin },
    { Component: CiEraser },
    { Component: PiTrashThin },
    { Component: PiArrowUUpLeftThin },
    { Component: PiArrowUUpRightThin },
  ];
  const themeColor = useSelector((state) => state.theme.themeColor);
  const toggleMenu = () => {
    setisMenuActive(!isMenuActive);
  };
  const [isMenuClicked, setMenuClicked] = useState(false);
  const [IsLiveButtonClicked, setIsLiveButtonClicked] = useState(false);
  const [IsDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false);
  return (
    <div
      className={`w-lvw p-4 flex justify-between items-center h-auto   ${
        themeColor == "light"
          ? "bg-white border-b-1 border-slate-200"
          : "bg-[#121212] text-white border-b-1 border-slate-700"
      }`}
    >
      <div
        className={`rounded-xl cursor-pointer w-10 h-10 flex justify-center items-center ${
          isMenuClicked ? "border-blue-500 border-1" : ""
        } ${themeColor == "light" ? "bg-gray-200" : "bg-[#232329] text-white"}`}
        onClick={toggleMenu}
        onMouseUp={() => {
          setMenuClicked(false);
        }}
        onMouseDown={() => {
          setMenuClicked(true);
        }}
      >
        <FiMenu />
      </div>
      <div
        className={` rounded-xl  shadow-md grid grid-rows-1 grid-cols-11 items-center justify-center gap-1 p-2 h-fit ${
          themeColor == "light"
            ? "bg-white border-slate-200 border-1"
            : "bg-[#232329] text-white"
        }`}
      >
        {icons.map(({ Component }, index) => (
          <Component
            key={index}
            size={35}
            className={`${
              themeColor == "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
            } p-2 rounded cursor-pointer`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className={`rounded-lg cursor-pointer shadow-sm text-md py-2 px-3 h-fit w-fit ${
            IsLiveButtonClicked ? "border-blue-500 border-1" : ""
          } ${
            themeColor == "light"
              ? "bg-gray-100 border-slate-300 border-1"
              : "bg-[#232329] text-white"
          }`}
          onMouseDown={() => {
            setIsLiveButtonClicked(true);
          }}
          onMouseUp={() => {
            setIsLiveButtonClicked(false);
          }}
        >
          Live
        </button>
        <button
          className={`rounded-lg cursor-pointer shadow-sm text-md py-2 px-3 h-fit w-fit ${
            IsDownloadButtonClicked ? "border-blue-500 border-1" : ""
          } ${
            themeColor == "light"
              ? "bg-gray-100 border-slate-300 border-1"
              : "bg-[#232329] text-white"
          }`}
          onMouseDown={() => {
            setIsDownloadButtonClicked(true);
          }}
          onMouseUp={() => {
            setIsDownloadButtonClicked(false);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
