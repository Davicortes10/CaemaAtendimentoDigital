import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login.jsx"
import { Home } from "./pages/Home.jsx";
import { ReportWaterShortage } from "./pages/ReportWaterShortage.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ReportWaterShortage" element={<ReportWaterShortage />} />
      </Routes>
    </Router>
  )
}

export default App
