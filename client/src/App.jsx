import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { Profile } from "./pages/profile/Profile";
import { Navbar } from "./components/common/Navbar";
import { PatientDetail } from "./pages/onboarding/PatientDetail";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import { DoctorDetail } from "./pages/onboarding/DoctorDetail";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { AuthRoutes } from "./components/common/AuthRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element= {<AuthRoutes/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/patient-detail" element={<PatientDetail />} />
          <Route path="/doctor-detail" element={<DoctorDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
