
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import { MaterialTailwindControllerProvider } from "./context";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <PayPalScriptProvider options={{ "client-id": "ARx9XhShyrot9_JI_fW8sagf31uV-tGwDGxfhC2XN25z_oB3TxElJB1XMwepjD-N99ScSnKbr29WgFzO" }}>
            <App />
          </PayPalScriptProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
