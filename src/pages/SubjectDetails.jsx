import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import { useGetSubjectByIdQuery } from "../redux/apiSlice";

// Display details for one subject using its ID from the URL.
function SubjectDetails() {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = user?.id;

  const {
    data: subject,
    isLoading,
    isError,
  } = useGetSubjectByIdQuery(id, {
    skip: !id || !loggedInUserId,
  });

  // Show a loading message while fetching the subject.
  if (isLoading) {
    return (
      <Container className="dashboard-container text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading subject details...</p>
      </Container>
    );
  }

  // Show an error if the subject cannot be fetched.
  if (isError) {
    return (
      <Container className="dashboard-container">
        <Alert variant="danger">
          Unable to load subject details.
        </Alert>
        <Button as={Link} to="/subjects" variant="secondary">
          Back to Subjects
        </Button>
      </Container>
    );
  }

  // Ensure the subject belongs to the logged-in user.
  if (!subject || String(subject.userId) !== String(loggedInUserId)) {
    return (
      <Container className="dashboard-container">
        <Alert variant="warning">
          Subject not found or you don't have permission to view it.
        </Alert>
        <Button as={Link} to="/subjects" variant="secondary">
          Back to Subjects
        </Button>
      </Container>
    );
  }

  return (
    <Container className="dashboard-container">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{subject.name}</Card.Title>
          <Card.Text>
            <strong>Study Hours:</strong> {subject.hours}
          </Card.Text>

          <Button as={Link} to="/subjects" variant="primary">
            Back to Subjects
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SubjectDetails;
