import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LabIanuaMindPage from "./pages/LabIanuaMindPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab/ianua-mind" element={<LabIanuaMindPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
