import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login.jsx"
import { Home } from "./pages/Home.jsx";
import { EditData } from "./pages/EditData.jsx";
import { ReportWaterShortage } from "./pages/ReportWaterShortage.jsx";
import { PasswordTracking } from "./pages/PasswordTracking.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/EditData" element={<EditData />} />
        <Route path="/ReportWaterShortage" element={<ReportWaterShortage />} />
        <Route path="/PasswordTracking" element={<PasswordTracking />} />
      </Routes>
    </Router>
  )
}

export default App
