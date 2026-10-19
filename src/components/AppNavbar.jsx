import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import useTheme from "../hooks/useTheme";

function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Get the current theme and theme toggle function.
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="app-navbar"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <img src="/favicon-sp.png" alt="Study Planner logo" />
          <span>Study Planner</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className={expanded ? "navbar-close-icon" : "navbar-menu-icon"}>
            {expanded ? "✕" : "☰"}
          </span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {!user && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/"
                  end
                  onClick={() => setExpanded(false)}
                >
                  Login
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/register"
                  end
                  onClick={() => setExpanded(false)}
                >
                  Register
                </Nav.Link>
              </>
            )}

            {user && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/dashboard"
                  end
                  onClick={() => setExpanded(false)}
                >
                  Dashboard
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/subjects"
                  end
                  onClick={() => setExpanded(false)}
                >
                  Subjects
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  end
                  onClick={() => setExpanded(false)}
                >
                  Profile
                </Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  className="logout-btn"
                  onClick={() => {
                    setExpanded(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </>
            )}

            {/* Button to switch between light and dark themes. */}
            <Button
              variant="outline-light"
              size="sm"
              className="ms-lg-3 mt-2 mt-lg-0"
              onClick={() => {
                toggleTheme();
                setExpanded(false);
              }}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
