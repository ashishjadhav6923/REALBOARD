import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as fabric from "fabric";
import { useCanvas } from "../context/CanvasContext";

const Canvas = () => {
  let {fabricCanvasRef} = useCanvas();
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const canvasColor = useSelector((state) => state.canvasColor.color);
  const toolbarHeight = useSelector((state) => state.toolbar.height);
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerHeight - toolbarHeight,
      width: window.innerWidth,
      isDrawingMode: true,
    });
    fabricCanvasRef.current = fabricCanvas;
    fabricCanvas.backgroundColor = canvasColor;
    fabricCanvas.renderAll();
    return () => {
      fabricCanvas.dispose();
    };
  }, [toolbarHeight, dispatch]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.backgroundColor = canvasColor;
      fabricCanvasRef.current.renderAll(); // Re-render canvas to apply the change
    }
  }, [canvasColor]);
  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
