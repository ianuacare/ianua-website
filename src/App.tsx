import { Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import ComingSoon from "./pages/ComingSoon";
import Home from "./pages/Home";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/home/" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MotionConfig>
  );
}
