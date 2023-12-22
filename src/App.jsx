import { Outlet } from "react-router-dom"
import Mainlayout from "./layouts/Mainlayout"
import Footer from "./components/Footer/Footer"

function App() {

  return (
   <>
    <Mainlayout>
      <Outlet/>
      <Footer/>
    </Mainlayout>
      </>
  )
}

export default App
