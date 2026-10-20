import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

// Shared layout for all protected pages.
function ProtectedLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
