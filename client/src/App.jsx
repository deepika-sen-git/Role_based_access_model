import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { Profile } from "./pages/profile/Profile";
import { Navbar } from "./components/common/Navbar";
import { PatientDetail } from "./pages/onboarding/PatientDetail";
import PatientDashboard from "./pages/dashboard/PatientDashboard";


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/patient-detail" element={<PatientDetail />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
