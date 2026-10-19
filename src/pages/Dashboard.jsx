import { useState } from "react"
import { useGetSubjectsQuery } from "../redux/apiSlice"
import { Container, Row, Col, Card, ProgressBar, Button, Form } from "react-bootstrap"

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"))
  const loggedInUserId = user?.id

  const {
    data: subjects = [],
    isLoading,
    isError,
  } = useGetSubjectsQuery(loggedInUserId, {
    skip: !loggedInUserId,
  })
  const [selectedCard, setSelectedCard] = useState(null)

  const [targetHours, setTargetHours] = useState(
    Number(localStorage.getItem(`targetHours_${loggedInUserId}`)) || 20
  )


  //calculations
  const totalSubjects = subjects.length
  const totalHours = subjects.reduce(
    (sum, sub) => sum + Number(sub.hours),
    0
  )

  const progress = Math.min((totalHours / targetHours) * 100, 100)
  // handle dashboard card click
  const handleCardClick = (card) => {
    setSelectedCard(selectedCard === card ? null : card)
  }

  // handle target hours change
  const handleTargetChange = (e) => {
    const value = Number(e.target.value)

    if (value <= 0) {
      return
    }

    setTargetHours(value)
    localStorage.setItem(`targetHours_${loggedInUserId}`, value)
  }

  return (
    <Container className="dashboard-container">
      <h2 className="text-center mb-4">
        Welcome {user?.name}
      </h2>

      {isLoading && (
        <p className="text-center">Loading dashboard...</p>
      )}

      {isError && (
        <p className="text-center text-danger">
          Failed to load dashboard data. Please try again.
        </p>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <Card
            className="dashboard-card shadow-sm"
            onClick={() => handleCardClick("subjects")}
          >
            <Card.Body>
              <h5>Total Subjects</h5>
              <h2>{totalSubjects}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card
            className="dashboard-card shadow-sm"
            onClick={() => handleCardClick("hours")}
          >

            <Card.Body>
              <h5>Total Study Hours</h5>
              <h2>{totalHours}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>



      {/* Subject Details */}
      {selectedCard === "subjects" && (
        <Card className="dashboard-details p-4 shadow-sm mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">📚 Your Subjects</h5>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </Button>
          </div>

          {subjects.length === 0 ? (
            <p className="text-muted text-center">
              No subjects added yet.
            </p>
          ) : (
            subjects.map((subject) => (
              <div
                key={subject.id}
                className="subject-row d-flex justify-content-between align-items-center"
              >
                <span>{subject.name}</span>
              </div>
            ))
          )}
        </Card>
      )}

      {/* Study Hours Details */}
      {selectedCard === "hours" && (
        <Card className="dashboard-details p-4 shadow-sm mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">📊 Study Hours by Subject</h5>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </Button>
          </div>

          {subjects.length === 0 ? (
            <p className="text-muted text-center">
              No subjects added yet.
            </p>
          ) : (
            <>
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="subject-row d-flex justify-content-between align-items-center"
                >
                  <span>{subject.name}</span>

                  <span className="text-muted">
                    {subject.hours} hrs
                  </span>
                </div>
              ))}

              <div className="d-flex justify-content-between pt-3 fw-bold">
                <span>Total</span>
                <span>{totalHours} hrs</span>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Progress */}
      <Card className="dashboard-progress p-4 shadow-sm">
        <h5 className="mb-3">🎯 Study Progress</h5>

        <Form.Group className="mb-3">
          <Form.Label>Set Your Target Hours</Form.Label>
          <Form.Control
            type="number"
            min="1"
            step="1"
            value={targetHours}
            onChange={handleTargetChange}
          />
        </Form.Group>

        <ProgressBar
          now={progress}
          label={`${Math.round(progress)}%`}
        />

        <p className="mt-2 text-muted">
          {totalHours} / {targetHours} hours completed
        </p>
      </Card>
    </Container>
  )
}

export default Dashboard