/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  useGetSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "../redux/apiSlice";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Placeholder,
} from "react-bootstrap";
import capitalizeWords from "../utils/formatText";
import { toast } from "react-toastify";

function Subjects() {
  // Read search and filter values from the URL.
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const selectedHours = searchParams.get("hours") || "all";
  const selectedSort = searchParams.get("sort") || "name-asc";

  // Get subjects belonging to the logged-in user.
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = user?.id;

  const {
    data: fetchedSubjects = [],
    isLoading,
    isError,
  } = useGetSubjectsQuery(loggedInUserId, {
    skip: !loggedInUserId,
  });

  const [addSubject, { isLoading: isAdding }] = useAddSubjectMutation();
  const [updateSubject, { isLoading: isUpdating }] =
    useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState("");

  // Check whether a subject is currently being saved.
  const isSaving = isAdding || isUpdating;

  // Filter subjects by name and study hours.
  const filteredSubjects = fetchedSubjects.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const subjectHours = Number(sub.hours);

    const matchesHours =
      selectedHours === "all" ||
      (selectedHours === "low" && subjectHours <= 2) ||
      (selectedHours === "high" && subjectHours > 2);

    return matchesSearch && matchesHours;
  });

  // Sort the filtered subjects based on the selected option.
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    if (selectedSort === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (selectedSort === "hours-asc") {
      return Number(a.hours) - Number(b.hours);
    }

    return 0;
  });

  // Update the search term in the URL.
  const handleSearchChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  // Update the study-hours filter in the URL.
  const handleHoursFilterChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("hours");
    } else {
      params.set("hours", value);
    }

    setSearchParams(params);
  };

  // Add or update a subject.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const studyHours = Number(hours);

    if (!trimmedName || trimmedName.length < 2) {
      setFormError("Please enter a subject name with at least 2 characters.");
      return;
    }

    if (
      !hours.trim() ||
      !Number.isFinite(studyHours) ||
      studyHours <= 0
    ) {
      setFormError("Please enter valid study hours greater than zero.");
      return;
    }

    setFormError("");

    try {
      if (editId) {
        // Update an existing subject.
        await updateSubject({
          id: editId,
          name: capitalizeWords(trimmedName),
          hours: String(studyHours),
          userId: loggedInUserId,
        }).unwrap();

        setEditId(null);
        toast.success("Subject updated successfully!");
      } else {
        // Add a new subject.
        await addSubject({
          name: capitalizeWords(trimmedName),
          hours: String(studyHours),
          userId: loggedInUserId,
        }).unwrap();

        toast.success("Subject added successfully!");
      }

      setName("");
      setHours("");
      setFormError("");
    } catch (err) {
      console.error("Failed to save subject:", err);
      setFormError("Unable to save the subject. Please try again.");
      toast.error("Failed to save subject. Please try again.");
    }
  };

  // Delete a subject.
  const handleDelete = async (id) => {
    try {
      await deleteSubject(id).unwrap();

      toast.success("Subject deleted successfully!");

      // Clear the form if the deleted subject was being edited.
      if (String(editId) === String(id)) {
        setEditId(null);
        setName("");
        setHours("");
        setFormError("");
      }
    } catch (err) {
      console.error("Failed to delete subject:", err);
      toast.error("Failed to delete subject. Please try again.");
    }
  };

  // Load a subject into the form for editing.
  const handleEdit = (sub) => {
    setName(sub.name);
    setHours(sub.hours);
    setEditId(sub.id);
    setFormError("");
  };

  // Cancel editing and reset the form.
  const handleCancelEdit = () => {
    setEditId(null);
    setName("");
    setHours("");
    setFormError("");
  };

  return (
    <Container className="dashboard-container">
      <h2 className="text-center mb-4">📚 Subjects</h2>

      {/* Add or update subject form */}
      <Card className="p-4 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit} className="subject-form">
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
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError("");
                }}
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
                onChange={(e) => {
                  setHours(e.target.value);
                  setFormError("");
                }}
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
              onClick={handleCancelEdit}
              disabled={isSaving}
            >
              Cancel Edit
            </Button>
          )}
        </Form>
      </Card>

      {/* Search, study-hours filter, and sorting */}
      <Row className="mb-3">
        <Col md={4} className="mb-2">
          <Form.Control
            type="search"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label="Search subjects"
          />
        </Col>

        <Col md={4} className="mb-2">
          <Form.Select
            value={selectedHours}
            onChange={(e) => handleHoursFilterChange(e.target.value)}
            aria-label="Filter subjects by study hours"
          >
            <option value="all">All study hours</option>
            <option value="low">2 hours or less</option>
            <option value="high">More than 2 hours</option>
          </Form.Select>
        </Col>

        <Col md={4} className="mb-2">
          <Form.Select
            value={selectedSort}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);

              if (e.target.value === "name-asc") {
                params.delete("sort");
              } else {
                params.set("sort", e.target.value);
              }

              setSearchParams(params);
            }}
            aria-label="Sort subjects"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="hours-asc">
              Study Hours (Low to High)
            </option>
          </Form.Select>
        </Col>
      </Row>


      {/* Skeleton cards while subjects are loading */}
      {isLoading && (
        <Row aria-label="Loading subjects" role="status">
          {[1, 2, 3].map((item) => (
            <Col md={4} key={item} className="mb-3">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={7} />
                  </Placeholder>

                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={5} />
                  </Placeholder>

                  <Placeholder animation="glow">
                    <Placeholder.Button xs={4} />
                    {" "}
                    <Placeholder.Button xs={3} />
                  </Placeholder>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}


      {isError && (
        <Alert variant="danger" role="alert">
          Unable to load subjects. Please try again.
        </Alert>
      )}

      {/* Display empty-state messages */}
      {!isLoading && !isError && sortedSubjects.length === 0 && (
        <p className="text-center">
          {fetchedSubjects.length === 0
            ? "No subjects added yet."
            : "No matching subjects found."}
        </p>
      )}

      {/* Display filtered subject cards */}
      <Row>
        {!isLoading &&
          !isError &&
          sortedSubjects.map((sub) => (
            <Col md={4} key={sub.id} className="mb-3">
              <Card className="shadow-sm subject-card h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{sub.name}</Card.Title>

                  <Card.Text>Study Hours: {sub.hours}</Card.Text>

                  <div className="d-flex gap-2 flex-wrap mt-auto">
                    <Button
                      as={Link}
                      to={`/subjects/${sub.id}`}
                      variant="primary"
                      size="sm"
                    >
                      View Details
                    </Button>

                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(sub)}
                      disabled={isSaving}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(sub.id)}
                      disabled={isSaving}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Subjects;