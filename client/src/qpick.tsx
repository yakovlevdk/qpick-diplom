import { MainPage } from "./pages/main/main";
import "./qpick.scss";

import { useEffect } from "react";

import { useRender } from "./hooks/use-render/use-render";
function Qpick() {
 
const {handleRender} = useRender()
 

  useEffect(() => {
    handleRender()
  }, [])

  return (
    <>
      <div>
        <MainPage />
      </div>
    </>
  );
}

export default Qpick;
