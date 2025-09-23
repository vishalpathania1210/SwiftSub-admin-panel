import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
 

 const App = () => {
  return (
    <>
         <ToastContainer position='top-center' />
  <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />  
      </Routes>
    </Router>
    </>
  )
}
export default App