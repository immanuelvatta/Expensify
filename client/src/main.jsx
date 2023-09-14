import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StyledEngineProvider } from "@mui/joy/styles";
import { AuthProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
