import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login.jsx"
import { Home } from "./pages/Home.jsx";
import { EditData } from "./pages/EditData.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/EditData" element={<EditData />} />
      </Routes>
    </Router>
  )
}

export default App
