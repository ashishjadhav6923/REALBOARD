import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setToolbarHeight } from "../features/toolbarSlice";
import useIconActions from "../constants/toolbarButtons";
import { CiPickerEmpty } from "react-icons/ci";
import { changedrawingColor } from "../features/canvasColor";
import { useCanvas } from "../context/CanvasContext";
import ToolbarDownloadLoadButtons from "./ToolbarDownloadLoadButtons";
// import RoomManager from "./RoomManager";

const Toolbar = ({ setisMenuActive, isMenuActive }) => {
  const dispatch = useDispatch();
  let { fabricCanvasRef } = useCanvas();
  const drawingColor = useSelector((state) => state.canvasColor.drawingColor);
  // const toggleRoomManager = () => {
  //   setisRoomManagerOpen(!isRoomManagerOpen);
  // };
  const handledrawingColorChange = (e) => {
    fabricCanvasRef.current.freeDrawingBrush.color = e.target.value;
    fabricCanvasRef.current.renderAll();
    dispatch(changedrawingColor(e.target.value));
  };
  const icons = useIconActions();
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
  // const [IsLiveButtonClicked, setIsLiveButtonClicked] = useState(false);
  const [IsDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false);
  return (
    <div
      ref={divRef}
      className={`w-lvw lg:p-4 p-2 flex justify-between items-center flex-col lg:flex-row gap-2 lg:gap-0 h-auto   ${
        themeColor == "light"
          ? "bg-white border-b-1 border-slate-200"
          : "bg-[#121212] text-white border-b-1 border-slate-700"
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        <div
          className={`rounded-xl cursor-pointer w-10 h-10 flex justify-center items-center ${
            isMenuClicked ? "border-blue-500 border-1" : ""
          } ${
            themeColor == "light" ? "bg-gray-200" : "bg-[#232329] text-white"
          }`}
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
        <label
          htmlFor="colorPicker"
          className="cursor-pointer rounded h-7 w-7 lg:hidden"
        >
          <CiPickerEmpty
            color="black"
            className="rounded h-full w-full"
            style={{
              background:
                "linear-gradient(45deg, #FF5733, #FFC300, #DAF7A6, #33FF57, #3383FF)",
            }}
          />
        </label>
        <span className="block lg:hidden">
          <ToolbarDownloadLoadButtons />
        </span>
      </span>

      <div className="flex items-center justify-center gap-4">
        <label
          htmlFor="colorPicker"
          className="cursor-pointer rounded h-7 w-7 hidden lg:block"
        >
          <CiPickerEmpty
            color="black"
            className="rounded h-full w-full"
            style={{
              background:
                "linear-gradient(45deg, #FF5733, #FFC300, #DAF7A6, #33FF57, #3383FF)",
            }}
          />
        </label>
        <input
          type="color"
          id="colorPicker"
          value={drawingColor}
          onChange={handledrawingColorChange}
          className="hidden"
        />
        <div
          className={`rounded-xl shadow-md grid grid-rows-1 grid-cols-12 items-center justify-center gap-1 lg:p-2 p-1 h-fit ${
            themeColor == "light"
              ? "bg-white border-slate-200 border-1"
              : "bg-[#232329] text-white"
          }`}
        >
          {icons.map(({ Component, onClick, isClicked }, index) => (
            <Component
              onClick={onClick}
              key={index}
              size={35}
              className={`${
                themeColor == "light"
                  ? "hover:bg-gray-200"
                  : "hover:bg-gray-700"
              } p-2 rounded cursor-pointer ${
                isClicked && themeColor == "light" ? "bg-gray-200" : ""
              } ${isClicked && themeColor == "dark" ? "bg-gray-700" : ""}`}
            />
          ))}
        </div>
      </div>
      <span className="hidden lg:block">
        <ToolbarDownloadLoadButtons />
      </span>
    </div>
  );
};

export default Toolbar;
