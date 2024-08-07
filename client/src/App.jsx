import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/common/Navbar";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen m-0 w-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <OpenRoute>
                <Dashboard />
              </OpenRoute>
            }
          />
        </Routes>
        {/* <Home/> */}
      </div>
    </>
  );
}

export default App;
