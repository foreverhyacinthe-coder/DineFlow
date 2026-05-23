import DineflowAuth from "./dineflow-auth";
import DineFlowDashboard from "./dashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DineflowAuth />} />
      <Route path="/dashboard" element={<DineFlowDashboard />} />
    </Routes>
  );
};

export default App;
