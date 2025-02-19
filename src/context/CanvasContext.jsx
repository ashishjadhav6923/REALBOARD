import { createContext, useContext, useRef, useState } from "react";

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
  const fabricCanvasRef = useRef(null);
  const [isPencilClicked, setisPencilClicked] = useState(false);

  return (
    <CanvasContext.Provider
      value={{ fabricCanvasRef, isPencilClicked, setisPencilClicked }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  return useContext(CanvasContext);
};
