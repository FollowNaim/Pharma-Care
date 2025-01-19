import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import { routes } from "./routes/Routes";

const queryClient = new QueryClient();
const hemletContext = {};
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider context={hemletContext}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
