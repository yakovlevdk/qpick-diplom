import { Outlet } from "react-router-dom"
import { Header } from "./components"
import { Footer } from "./components/footer/footer"
import { Suspense } from "react"
export const Layout = () => { 
    return ( 
        <>
         <Header/>
         <div className="container">
            <Suspense fallback={ <div className="loader" style={{display: 'flex' , justifyContent: 'center', alignItems: 'center',  height: "100vh"}}>
          <img src="/loader.svg" width={70} height={70} />
        </div>}>
         <Outlet/>
        </Suspense>
         </div>
        <Footer/>
        </>
       
    )
}