import { useState } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import Menu from "./components/Menu";

function App() {
  const [isMenuActive, setisMenuActive] = useState(false);
  return (
    <div className="h-lvh w-lvw flex flex-col">
      <Toolbar isMenuActive={isMenuActive} setisMenuActive={setisMenuActive}/>
      <Canvas />
      {isMenuActive && <Menu />}
    </div>
  );
}

export default App;
