import DineflowAuth from "./dineflow-auth";
import { Routes, Route} from "react-router-dom"
const App = ()=>{
  return (
    <>

      <Routes>
        <Route path="/dineflow-auth" element={<DineflowAuth/>}/>
      </Routes>
  
    </>
  )
}

export default App;