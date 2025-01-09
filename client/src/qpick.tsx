import { Header } from "./components";
import { Footer } from "./components/footer/footer";
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
        <Header />
        <MainPage />
        <Footer />
      </div>
    </>
  );
}

export default Qpick;
