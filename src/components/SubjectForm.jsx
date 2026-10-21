
import { Button, Card, Form, Row, Col, Alert } from "react-bootstrap";

// Reusable form for adding or editing a subject.
function SubjectForm({
  name,
  hours,
  editId,
  formError,
  isSaving,
  onNameChange,
  onHoursChange,
  onSubmit,
  onCancel,
}) {
  return (
    <Card className="p-4 mb-4 shadow-sm">
      <Form onSubmit={onSubmit} className="subject-form">
        {formError && (
          <Alert variant="danger" role="alert">
            {formError}
          </Alert>
        )}

        <Row>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Subject name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              required
              minLength={2}
              aria-label="Subject name"
            />
          </Col>

          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="Study hours"
              min="0.1"
              step="0.1"
              value={hours}
              onChange={(e) => onHoursChange(e.target.value)}
              required
              aria-label="Study hours"
            />
          </Col>

          <Col md={3}>
            <Button
              type="submit"
              className="w-100"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : editId
                  ? "Update Subject"
                  : "Add Subject"}
            </Button>
          </Col>
        </Row>

        {editId && (
          <Button
            type="button"
            variant="secondary"
            className="mt-3"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel Edit
          </Button>
        )}
      </Form>
    </Card>
  );
}

export default SubjectForm;
