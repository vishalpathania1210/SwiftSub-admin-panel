import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOtp from "./Pages/VerifyOtp";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import Overview from "./Pages/Overview";
import Providers from "./Pages/Providers";
import Revenue from "./Pages/Revenue";

// jkshdguirdfb gvawrfs
const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/VerifyOtp" element={<VerifyOtp />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Overview" element={<Overview />} />
          <Route path="/Providers" element={<Providers />} />
          <Route path="/Revenue" element={<Revenue />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
