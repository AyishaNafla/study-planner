import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Display a helpful message when a page does not exist.
function NotFound() {
  return (
    <Container className="dashboard-container text-center">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Button as={Link} to="/" variant="primary">
        Go to Home
      </Button>
    </Container>
  );
}

export default NotFound;
