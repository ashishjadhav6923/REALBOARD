import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setToolbarHeight } from "../features/toolbarSlice";
import useIconActions from "../constants/toolbarButtons";

const Toolbar = ({ setisMenuActive, isMenuActive }) => {
  const icons = useIconActions();
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const [divHeight, setDivHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (divRef.current) {
        dispatch(
          setToolbarHeight(divRef.current.getBoundingClientRect().height)
        );
        setDivHeight(divRef.current.getBoundingClientRect().height);
      }
    };
    updateHeight(); // Initial height
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const themeColor = useSelector((state) => state.theme.themeColor);
  const toggleMenu = () => {
    setisMenuActive(!isMenuActive);
  };
  const [isMenuClicked, setMenuClicked] = useState(false);
  const [IsLiveButtonClicked, setIsLiveButtonClicked] = useState(false);
  const [IsDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false);
  return (
    <div
      ref={divRef}
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
        className={` rounded-xl  shadow-md grid grid-rows-1 grid-cols-12 items-center justify-center gap-1 p-2 h-fit ${
          themeColor == "light"
            ? "bg-white border-slate-200 border-1"
            : "bg-[#232329] text-white"
        }`}
      >
        {icons.map(({ Component, onClick }, index) => (
          <Component
            onClick={onClick}
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
