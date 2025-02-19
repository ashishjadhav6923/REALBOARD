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
    { text: "Open", logo: <PiFolderThin size={17} />, onclick: () => {} },
    { text: "Download", logo: <PiDownloadThin size={17} />, onclick: () => {} },
    {
      text: "Live Collaboration",
      logo: <PiUsersThin size={17} />,
      onclick: () => {},
    },
    {
      text: "Reset the Canvas",
      logo: <PiTrashThin size={17} />,
      onclick: () => {
        fabricCanvasRef.current.discardActiveObject();
        fabricCanvasRef.current.getObjects().forEach((obj) => {
          fabricCanvasRef.current.remove(obj);
        });
        console.log("Canvas cleared");
      },
    },
    { text: "Sign Up", logo: <PiSignInThin size={17} />, onclick: () => {} },
  ];
};

export const theme = [
  { type: "light", logo: <PiSunThin /> },
  { type: "dark", logo: <PiMoonThin /> },
  { type: "system", logo: <PiMonitorThin /> },
];
