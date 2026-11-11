import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import { router } from "./router";
import { captureUtm } from "./lib/tracking";

captureUtm();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
        <Analytics />
      </MotionConfig>
    </HelmetProvider>
  </StrictMode>,
);
