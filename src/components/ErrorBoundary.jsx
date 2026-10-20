import { Component } from "react";
import { Button, Container } from "react-bootstrap";

// Catches rendering errors in child components.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // Update the state when a child component throws an error.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Log the error for debugging.
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  // Reset the page by reloading the application.
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="text-center py-5">
          <h2>Something went wrong!</h2>
          <p>
            An unexpected error occurred. Please reload the page and try again.
          </p>
          <Button onClick={this.handleReload}>
            Reload Page
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
