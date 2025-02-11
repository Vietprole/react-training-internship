import { Routes, Route } from "react-router";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Done from "./pages/Done/Done";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/home/" element={<Home />} />
        <Route path="/home/done" element={<Done />} />
      </Route>
    </Routes>
  );
}

export default App;
