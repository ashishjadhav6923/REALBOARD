import { useDispatch, useSelector } from "react-redux";
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
import { useRef } from "react";

const useIconActions = () => {
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const resetEraserMode = () => {
    fabricCanvasRef.current.selection = true;
    fabricCanvasRef.current.forEachObject((obj) => {
      obj.selectable = true; // Disable selection
      obj.evented = true; // Disable interaction
    });
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    }
  };
  const resetAllButtonClicked=()=>{
    setisHandClicked(false);
    setisPencilClicked(false);
    setisEraserClicked(false);
  }
  // const saveState = () => {
  //   if (fabricCanvasRef.current) {
  //     const json = fabricCanvasRef.current.toJSON();
  //     undoStack.current.push(json);
  //     redoStack.current.length = 0; // Clear redo stack on new action
  //   }
  // };
  // const canvasColor = useSelector((state) => state.canvasColor.color);
  let {
    fabricCanvasRef,
    isPencilClicked,
    setisPencilClicked,
    setisEraserClicked,
    isEraserClicked,
    setisHandClicked,
    isHandClicked
  } = useCanvas();
  const drawingColor = useSelector((state) => state.canvasColor.drawingColor);

  return [
    {
      Component: PiHandThin,
      isClicked: isHandClicked,
      onClick: () => {
        resetAllButtonClicked();
        setisHandClicked(true);
        resetEraserMode();
        setisPencilClicked(false);
        fabricCanvasRef.current.isDrawingMode = false;
        console.log("selection tool added");
      },
    },
    // 📝 **Pencil Tool**
    {
      Component: PiPencilSimpleLineThin,
      isClicked: isPencilClicked,
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        if (!isPencilClicked) {
          setisPencilClicked(true);
          fabricCanvasRef.current.isDrawingMode = true;
          fabricCanvasRef.current.freeDrawingBrush.color = drawingColor;
        } else if (isPencilClicked) {
          setisPencilClicked(false);
          fabricCanvasRef.current.isDrawingMode = false;
        }
        console.log("Pencil clicked");
      },
    },

    // 🟥 **Square Tool**
    {
      Component: PiSquareThin,
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const square = new fabric.Rect({
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: drawingColor,
          strokeWidth: 1,
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
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const triangle = new fabric.Triangle({
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: drawingColor,
          strokeWidth: 1,
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
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
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
            stroke: drawingColor,
            strokeWidth: 1,
          }
        );
        fabricCanvasRef.current.add(diamond);
        console.log("Diamond added");
      },
    },

    // ➖ **Line Tool**
    {
      Component: TfiLayoutLineSolid,
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const line = new fabric.Line([50, 100, 200, 100], {
          stroke: drawingColor,
          strokeWidth: 1,
        });
        fabricCanvasRef.current.add(line);
        console.log("Line added");
      },
    },

    // 🔵 **Circle Tool**
    {
      Component: GiCircle,
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const circle = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 30,
          fill: "transparent",
          stroke: drawingColor,
          strokeWidth: 1,
        });
        fabricCanvasRef.current.add(circle);
        console.log("Circle added");
      },
    },

    // ✍ **Text Tool**
    {
      Component: PiTextAaThin,
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const text = new fabric.Textbox("Type here", {
          left: 100,
          top: 100,
          fontSize: 20,
          fill: drawingColor,
          editable: true,
        });
        fabricCanvasRef.current.add(text);
        console.log("Text added");
      },
    },

    // 🧹 **Eraser Tool**
    {
      Component: CiEraser,
      isClicked: isEraserClicked,
      onClick: () => {
        resetAllButtonClicked();
        fabricCanvasRef.current.selection = false;
        fabricCanvasRef.current.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false; // Disable interaction
        });
        setisPencilClicked(false);
        setisEraserClicked(true);
        if (fabricCanvasRef.current) {
          const canvas = fabricCanvasRef.current;
          let isErasing = false; // Initially not erasing
          canvas.defaultCursor = "crosshair";
          canvas.isDrawingMode = false;

          // Clear previous event listeners
          canvas.off("mouse:down");
          canvas.off("mouse:move");
          canvas.off("mouse:up");

          canvas.on("mouse:down", (event) => {
            isErasing = true;
          });

          canvas.on("mouse:move", (event) => {
            if (isErasing) {
              removeObjects(event);
            }
          });

          canvas.on("mouse:up", () => {
            isErasing = false;
          });

          function removeObjects(event) {
            const pointer = canvas.getPointer(event.e);
            const objects = canvas.getObjects();

            objects.forEach((obj) => {
              if (obj.containsPoint(pointer)) {
                undoStack.current.push(obj);
                canvas.remove(obj);
              }
            });

            canvas.renderAll();
          }
        }
      },
    },

    // 🗑 **Clear Drawing (Trash)**
    {
      Component: PiTrashThin,
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
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
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        fabricCanvasRef.current.discardActiveObject();
        if (undoStack.current.length) {
          const lastUndo = undoStack.current.pop();
          fabricCanvasRef.current.add(lastUndo);
          fabricCanvasRef.current.renderAll();
        } else {
          if (fabricCanvasRef.current._objects.length > 0) {
            const lastObject = fabricCanvasRef.current._objects.pop();
            redoStack.current.push(lastObject);
            fabricCanvasRef.current.renderAll();
            console.log("Undo");
          }
        }
      },
    },

    // ⏩ **Redo**
    {
      Component: PiArrowUUpRightThin,
      isClicked: "",
      onClick: () => {
        resetAllButtonClicked();
        resetEraserMode();
        if (redoStack.current.length > 0) {
          const lastRedo = redoStack.current.pop();
          fabricCanvasRef.current.add(lastRedo);
          console.log("Redo");
        }
      },
    },
  ];
};

export default useIconActions;
