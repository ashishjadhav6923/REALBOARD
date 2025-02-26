import React, { useState } from 'react'
import { PiDownload } from "react-icons/pi";
import { PiUpload } from "react-icons/pi";
import { useCanvas } from '../context/CanvasContext';
import { useSelector } from 'react-redux';

const ToolbarDownloadLoadButtons = () => {
    const themeColor = useSelector((state) => state.theme.themeColor);
    let { fabricCanvasRef } = useCanvas();
    const [IsDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false);
  return (
    <div className="flex gap-2">
        <button
          className={`select-none rounded-xl cursor-pointer shadow-sm text-md py-2 px-3 h-fit w-fit ${
            themeColor == "light"
              ? "bg-gray-100 border-slate-300 border-1 hover:border-blue-500"
              : "bg-[#232329] text-white hover:border-1 hover:border-blue-500"
          }`}
          onClick={() => {
            if (fabricCanvasRef.current) {
              const dataURL = fabricCanvasRef.current.toDataURL({
                format: "png",
                quality: 1.0, // Adjust quality if needed
              });

              const link = document.createElement("a");
              link.href = dataURL;
              link.download = "canvas-image.png"; // File name
              link.click();
            }
          }}
          onMouseDown={() => {
            setIsDownloadButtonClicked(true);
          }}
          onMouseUp={() => {
            setIsDownloadButtonClicked(false);
          }}
        >
          <span className="flex justify-center items-center gap-1">
            PNG
            <PiDownload />
          </span>
        </button>
        <button
          className={`select-none rounded-xl cursor-pointer shadow-sm text-md py-2 px-3 h-fit w-fit ${
            IsDownloadButtonClicked ? "border-blue-500 border-1" : ""
          } ${
            themeColor == "light"
              ? "bg-gray-100 border-slate-300 border-1 hover:border-blue-500"
              : "bg-[#232329] text-white hover:border-1 hover:border-blue-500"
          }`}
          onClick={() => {
            if (fabricCanvasRef.current) {
              const json = fabricCanvasRef.current.toJSON();
              const dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(json));
              const link = document.createElement("a");
              link.href = dataStr;
              link.download = "canvas.json";
              link.click();
            }
          }}
        >
          <span className="flex justify-center items-center gap-1">
            JSON
            <PiDownload />
          </span>
        </button>
        <button
          className={`select-none rounded-xl cursor-pointer shadow-sm text-md py-2 px-3 h-fit w-fit ${
            IsDownloadButtonClicked ? "border-blue-500 border-1" : ""
          } ${
            themeColor == "light"
              ? "bg-gray-100 border-slate-300 border-1 hover:border-blue-500"
              : "bg-[#232329] text-white hover:border-1 hover:border-blue-500"
          }`}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/json";
            input.onchange = (event) => {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                  let json;
                  try {
                    json = JSON.parse(e.target.result);
                  } catch (error) {
                    alert("Only Json files are allowed");
                    console.log("error while loading file", error);
                    return;
                  }
                  if (fabricCanvasRef.current) {
                    await fabricCanvasRef.current.loadFromJSON(json, () => {
                      console.log("Canvas loaded successfully");
                    });
                    fabricCanvasRef.current.renderAll();
                  }
                };
                reader.readAsText(file);
              }
            };
            input.click();
          }}
        >
          <span className="flex justify-center items-center gap-1">
            JSON
            <PiUpload />
          </span>
        </button>
      </div>
  )
}

export default ToolbarDownloadLoadButtons;