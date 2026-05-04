import { Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import ComingSoon from "./pages/ComingSoon";
import GenerateArticle from "./pages/GenerateArticle";
import Home from "./pages/Home";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Navigate to="/ianua-mind" replace />} />
        <Route path="/ianua-mind" element={<Home />} />
        <Route path="/ianua-mind/" element={<Navigate to="/ianua-mind" replace />} />
        <Route path="/generate-article" element={<GenerateArticle />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/home" element={<Navigate to="/ianua-mind" replace />} />
        <Route path="/home/" element={<Navigate to="/ianua-mind" replace />} />
        <Route path="*" element={<Navigate to="/ianua-mind" replace />} />
      </Routes>
    </MotionConfig>
  );
}
