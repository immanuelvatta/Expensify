import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
// import SignUp from "./views/SignUp";
import Home from "./views/Home";
import CreateEvent from "./views/CreateEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp/>}/> */}
          <Route path="/home" element={<Home/>} />
          <Route path="/event" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
