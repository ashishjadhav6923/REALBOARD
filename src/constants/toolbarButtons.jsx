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

const useIconActions = () => {
  let undoStack = [];
  let redoStack = [];
  const resetEraserMode = () => {
    setisEraserClicked(false);
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    }
  };
  const canvasColor = useSelector((state) => state.canvasColor.color);
  let {
    fabricCanvasRef,
    isPencilClicked,
    setisPencilClicked,
    setisEraserClicked,
    isEraserClicked,
  } = useCanvas();
  const drawingColor = useSelector((state) => state.canvasColor.drawingColor);

  return [
    {
      Component: PiHandThin,
      onClick: () => {
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
        resetEraserMode();
        if (!isPencilClicked) {
          setisPencilClicked(true);
          fabricCanvasRef.current.isDrawingMode = true;
          fabricCanvasRef.current.freeDrawingBrush.color = drawingColor;
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
      isClicked: "",
      onClick: () => {
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const square = new fabric.Rect({
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: drawingColor,
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
      isClicked: "",
      onClick: () => {
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const triangle = new fabric.Triangle({
          left: 100,
          top: 100,
          fill: "transparent",
          stroke: drawingColor,
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
      isClicked: "",
      onClick: () => {
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
      isClicked: "",
      onClick: () => {
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const line = new fabric.Line([50, 100, 200, 100], {
          stroke: drawingColor,
          strokeWidth: 2,
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
        resetEraserMode();
        fabricCanvasRef.current.isDrawingMode = false;
        setisPencilClicked(false);
        const circle = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 30,
          fill: "transparent",
          stroke: drawingColor,
          strokeWidth: 2,
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
      isClicked: "",
      onClick: () => {
        setisEraserClicked(!isEraserClicked);
        if (fabricCanvasRef.current) {
          const canvas = fabricCanvasRef.current;
          let isErasing = false; // Initially not erasing
          canvas.defaultCursor = "crosshair";
          // Disable drawing mode
          canvas.isDrawingMode = false;

          // Clear previous event listeners
          canvas.off("mouse:down");
          canvas.off("mouse:move");
          canvas.off("mouse:up");

          // Mouse down event - Start erasing
          canvas.on("mouse:down", (event) => {
            isErasing = true;
          });

          // Mouse move event - Only erase when mouse is pressed
          canvas.on("mouse:move", (event) => {
            if (isErasing) {
              removeObjects(event);
            }
          });

          // Mouse up event - Stop erasing
          canvas.on("mouse:up", () => {
            isErasing = false;
          });

          // Function to remove objects under the eraser
          function removeObjects(event) {
            const pointer = canvas.getPointer(event.e);
            const objects = canvas.getObjects();

            objects.forEach((obj) => {
              if (obj.containsPoint(pointer)) {
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
        resetEraserMode();
        fabricCanvasRef.current.discardActiveObject();
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
      isClicked: "",
      onClick: () => {
        resetEraserMode();
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
