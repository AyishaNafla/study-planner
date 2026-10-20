import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SubjectDetails from "./pages/SubjectDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import AppNavbar from "./components/AppNavbar";
import Subjects from "./pages/Subjects";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import useTheme from "./hooks/useTheme";

// Keep the navbar visible across all pages.
function MainLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}-theme`}>
      <BrowserRouter>
        <Routes>
          {/* Shared navbar layout for all pages */}
          <Route element={<MainLayout />}>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with a nested layout */}
            <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:id" element={<SubjectDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Display the 404 page for unknown URLs */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
