import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import SnacksPage from "./pages/SnacksPage";
import StudentsPage from "./pages/StudentsPage";
import StudentDetailPage from "./pages/StudentDetailPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <nav className="flex gap-6 mb-6 border-b pb-2 font-medium">
        <Link to="/snacks" className="hover:text-blue-600">
          Snacks
        </Link>
        <Link to="/students" className="hover:text-blue-600">
          Students
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/snacks" />} />
        <Route path="/snacks" element={<SnacksPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
