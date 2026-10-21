import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

// Reusable card for displaying an individual subject.
function SubjectCard({ subject, onEdit, onDelete, isSaving }) {
  return (
    <Card className="shadow-sm subject-card h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{subject.name}</Card.Title>

        <Card.Text>Study Hours: {subject.hours}</Card.Text>

        <div className="d-flex gap-2 flex-wrap mt-auto">
          <Button
            as={Link}
            to={`/subjects/${subject.id}`}
            variant="primary"
            size="sm"
          >
            View Details
          </Button>

          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(subject)}
            disabled={isSaving}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(subject.id)}
            disabled={isSaving}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SubjectCard;
