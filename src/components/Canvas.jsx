import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Canvas = () => {
  const canvasColor = useSelector(state => state.canvasColor.color);
  return (
    <div className={`h-full`} style={{ backgroundColor: canvasColor }}></div>
  );
};

export default Canvas;
