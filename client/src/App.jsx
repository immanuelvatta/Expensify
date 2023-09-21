import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import CreateEvent from "./views/CreateEvent";
import { Dashboard } from "./views/Dashboard";
import Landing from "./views/Landing";
import { Invitation } from "./views/Invitation";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import FirstSidebar from "./components/dashboard/FirstSidebar";
import { useScript } from "./utils/useScript";
import { AuthContext } from "./context/authContext";
import Header from "./components/dashboard/Header";
import { OneBuddy } from "./views/OneBuddy";
import {OneTrip} from "./views/OneTrip";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function App() {
  const status = useScript(`https://unpkg.com/feather-icons`);
  const { currentUser } = useContext(AuthContext);
  const [navShouldRender, setNavShouldRender] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setNavShouldRender(false);
    } else {
      setNavShouldRender(true);
    }
  }, [currentUser]);

  useEnhancedEffect(() => {
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  });

  let sidebar = null;

  if (navShouldRender) {
    sidebar = 
    <>
    <Header/>
    <FirstSidebar/>
    </>
  } else {
    sidebar = null;
  }


  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <BrowserRouter>
          {sidebar}
        <Routes>
          <Route path="/" element={<Navigate to="/bwiv" />} />
          <Route path="/bwiv" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invite/buddies" element={<Invitation />} />
          <Route path="/buddy/:id" element={<OneBuddy />} />
          <Route path="/trip/:id" element={<OneTrip />} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;