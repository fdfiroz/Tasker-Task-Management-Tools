import { Outlet } from "react-router-dom"
import Mainlayout from "./layouts/Mainlayout"

function App() {

  return (
    <Mainlayout>
      <Outlet/>
    </Mainlayout>
  )
}

export default App
