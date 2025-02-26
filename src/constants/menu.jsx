import { PiDownloadThin } from "react-icons/pi";
import { PiUsersThin } from "react-icons/pi";
import { PiTrashThin } from "react-icons/pi";
import { PiSignInThin } from "react-icons/pi";
import { PiFolderThin } from "react-icons/pi";

import { PiSunThin } from "react-icons/pi";
import { PiMoonThin } from "react-icons/pi";
import { PiMonitorThin } from "react-icons/pi";
import { useCanvas } from "../context/CanvasContext";

export const getMenu = () => {
  let { fabricCanvasRef } = useCanvas();

  return [
    {
      text: "Load JSON Canvas",
      logo: <PiFolderThin size={17} />,
      onClick: () => {
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
                alert("Only Json files are allowed")
                console.log("error while loading file",error);
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
      },
    },
    {
      text: "Download PNG",
      logo: <PiDownloadThin size={17} />,
      onClick: () => {
        if (fabricCanvasRef.current) {
          const dataURL = fabricCanvasRef.current.toDataURL({
            format: "png",
            quality: 1.0,
          });

          const link = document.createElement("a");
          link.href = dataURL;
          link.download = "realBoard.png"; 
          link.click();
        }
      },
    },
    {
      text: "Download JSON",
      logo: <PiDownloadThin size={17} />,
      onClick: () => {
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
      },
    },
    // {
    //   text: "Live Collaboration",
    //   logo: <PiUsersThin size={17} />,
    //   onClick: () => {},
    // },
    {
      text: "Reset the Canvas",
      logo: <PiTrashThin size={17} />,
      onClick: () => {
        fabricCanvasRef.current.discardActiveObject();
        fabricCanvasRef.current.getObjects().forEach((obj) => {
          fabricCanvasRef.current.remove(obj);
        });
        console.log("Canvas cleared");
      },
    },
    // { text: "Sign Up", logo: <PiSignInThin size={17} />, onClick: () => {} },
  ];
};

export const theme = [
  { type: "light", logo: <PiSunThin /> },
  { type: "dark", logo: <PiMoonThin /> },
  { type: "system", logo: <PiMonitorThin /> },
];
