/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react"
import {
  useGetSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "../redux/apiSlice"
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap"
import capitalizeWords from "../utils/formatText"

function Subjects() {
  const user = JSON.parse(localStorage.getItem("user"))
  const loggedInUserId = user?.id
  const {
    data: fetchedSubjects = [],
    isLoading,
    isError,
  } = useGetSubjectsQuery(loggedInUserId, {
    skip: !loggedInUserId,
  })
  const [addSubject] = useAddSubjectMutation()
  const [updateSubject] = useUpdateSubjectMutation()
  const [deleteSubject] = useDeleteSubjectMutation()
  const [name, setName] = useState("")
  const [hours, setHours] = useState("")
  const [editId, setEditId] = useState(null)



  // add OR update subject
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || Number(hours) <= 0) {
      return
    }

    try {
      if (editId) {
        // UPDATE
        await updateSubject({
          id: editId,
          name: capitalizeWords(name),
          hours,
          userId: loggedInUserId,
        }).unwrap()

        setEditId(null)
      } else {
        // ➕ ADD
        await addSubject({
          name: capitalizeWords(name),
          hours,
          userId: loggedInUserId,
        }).unwrap()
      }

      setName("")
      setHours("")
    } catch (err) {
      console.log(err)
    }
  }


  // delete
  const handleDelete = async (id) => {
    try {
      await deleteSubject(id).unwrap()
    } catch (err) {
      console.log(err)
    }
  }


  // edit click
  const handleEdit = (sub) => {
    setName(sub.name)
    setHours(sub.hours)
    setEditId(sub.id)
  }

  return (
    <Container className="dashboard-container">
      <h2 className="text-center mb-4">📚 Subjects</h2>

      {/* Form */}
      <Card className="p-4 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit} className="subject-form">
          <Row>
            <Col md={5}>
              <Form.Control
                placeholder="Subject name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Study hours"
                min="0.1"
                step="0.1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Button type="submit" className="w-100">
                {editId ? "Update Subject" : "Add Subject"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>


      {/* List */}
      {isLoading && (
        <p className="text-center">Loading subjects...</p>
      )}

      {isError && (
        <p className="text-center text-danger">
          Failed to load subjects. Please try again.
        </p>
      )}

      <Row>

        {fetchedSubjects.map((sub) => (
          <Col md={4} key={sub.id} className="mb-3">
            <Card className="shadow-sm subject-card">
              <Card.Body>
                <Card.Title>{sub.name}</Card.Title>
                <Card.Text>Study Hours: {sub.hours}</Card.Text>

                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(sub)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(sub.id)}
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
  )
}

export default Subjects