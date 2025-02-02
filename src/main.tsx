import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import queryClient from "./lib/config/queryClient";

// Create a client
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* Dev tools for debugging */}
    </QueryClientProvider>
  </StrictMode>,
);
