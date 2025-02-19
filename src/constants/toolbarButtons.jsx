import { useDispatch } from "react-redux";
import {
  PiPencilSimpleLineThin,
  PiSquareThin,
  PiTriangleThin,
  PiDiamondThin,
  PiTextAaThin,
  PiArrowUUpLeftThin,
  PiArrowUUpRightThin,
  PiTrashThin,
  PiHandThin,
} from "react-icons/pi";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { GiCircle } from "react-icons/gi";
import { CiEraser } from "react-icons/ci";
import { useCanvas } from "../context/CanvasContext";
import * as fabric from "fabric";

const useIconActions = () => {
  let { fabricCanvasRef, isPencilClicked, setisPencilClicked } = useCanvas();
  let undoStack = [];
  let redoStack = [];

  return [
    {
      Component: PiHandThin ,
      onClick: () => {
        setisPencilClicked(false);
        fabricCanvasRef.current.isDrawingMode = false;
        console.log("selection tool added");
      },
    },
    // 📝 **Pencil Tool**
    {
      Component: PiPencilSimpleLineThin,
      onClick: () => {
        if (!isPencilClicked) {
          setisPencilClicked(true);
          fabricCanvasRef.current.isDrawingMode = true;
          fabricCanvasRef.current.freeDrawingBrush = new fabric.PencilBrush(
            fabricCanvasRef.current
          );
          fabricCanvasRef.current.freeDrawingBrush.color = "black";
        } else if (isPencilClicked) {
          setisPencilClicked(false);
          fabricCanvasRef.current.isDrawingMode = false;
        }
        console.log("Pencil clicked", fabricCanvasRef.current.isDrawingMode);
      },
    },

    // 🟥 **Square Tool**
    {
      Component: PiSquareThin,
      onClick: () => {
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const square = new fabric.Rect({
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 2,
          width: 50,
          height: 50,
        });
        fabricCanvasRef.current.add(square);
        console.log("Square added");
      },
    },

    // 🔺 **Triangle Tool**
    {
      Component: PiTriangleThin,
      onClick: () => {
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const triangle = new fabric.Triangle({
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 2,
          width: 50,
          height: 50,
        });
        fabricCanvasRef.current.add(triangle);
        console.log("Triangle added");
      },
    },

    // 🔷 **Diamond Tool**
    {
      Component: PiDiamondThin,
      onClick: () => {
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const diamond = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 50 },
          ],
          {
            left: 100,
            top: 100,
            fill: "transparent",
            stroke: "black",
            strokeWidth: 2,
          }
        );
        fabricCanvasRef.current.add(diamond);
        console.log("Diamond added");
      },
    },

    // ➖ **Line Tool**
    {
      Component: TfiLayoutLineSolid,
      onClick: () => {
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const line = new fabric.Line([50, 100, 200, 100], {
          stroke: "black",
          strokeWidth: 2,
        });
        fabricCanvasRef.current.add(line);
        console.log("Line added");
      },
    },

    // 🔵 **Circle Tool**
    {
      Component: GiCircle,
      onClick: () => {
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const circle = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 30,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 2,
        });
        fabricCanvasRef.current.add(circle);
        console.log("Circle added");
      },
    },

    // ✍ **Text Tool**
    {
      Component: PiTextAaThin,
      onClick: () => {
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const text = new fabric.Textbox("Type here", {
          left: 100,
          top: 100,
          fontSize: 20,
          fill: "black",
          editable: true,
        });
        fabricCanvasRef.current.add(text);
        console.log("Text added");
      },
    },

    // 🧹 **Eraser Tool**
    {
      Component: CiEraser,
      onClick: () => {
        console.log("Eraser activated (select objects to delete)");
        // }
      },
    },
    // 🗑 **Clear Drawing (Trash)**
    {
      Component: PiTrashThin,
      onClick: () => {
        fabricCanvasRef.current.discardActiveObject();
        fabricCanvasRef.current.getObjects().forEach((obj) => {
          fabricCanvasRef.current.remove(obj);
        });
        console.log("Canvas cleared");
      },
    },

    // ⏪ **Undo**
    {
      Component: PiArrowUUpLeftThin,
      onClick: () => {
        fabricCanvasRef.current.discardActiveObject();
        // fabricCanvasRef.current.requestRenderAll();
        if (fabricCanvasRef.current._objects.length > 0) {
          const lastObject = fabricCanvasRef.current._objects.pop();
          redoStack.push(lastObject);
          fabricCanvasRef.current.renderAll();
          console.log("Undo");
        }
      },
    },

    // ⏩ **Redo**
    {
      Component: PiArrowUUpRightThin,
      onClick: () => {
        if (redoStack.length > 0) {
          const lastRedo = redoStack.pop();
          fabricCanvasRef.current.add(lastRedo);
          console.log("Redo");
        }
      },
    },
  ];
};

export default useIconActions;
