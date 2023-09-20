import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import CreateEvent from "./views/CreateEvent";
import { Dashboard } from "./views/Dashboard";
import Landing from "./views/Landing";
import { Invitation } from "./views/Invitation";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/bwiv"} />} />
          <Route path="/bwiv" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/event" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/invite/buddies" element={<Invitation/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
