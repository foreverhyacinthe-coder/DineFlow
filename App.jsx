import DineflowAuth from "./dineflow-auth";
import DineFlowDashboard from "./dashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DineflowAuth />} />
      <Route path="/dineflow-auth" element={<DineflowAuth />} />
      <Route path="/dashboard" element={<DineFlowDashboard />} />
      <Route path="*" element={<DineflowAuth />} />
    </Routes>
  );
};

export default App;
