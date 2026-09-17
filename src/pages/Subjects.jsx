/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useCallback, useEffect } from "react"
import axios from "axios"
import API_URL from "../api"
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap"

function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [name, setName] = useState("")
  const [hours, setHours] = useState("")
  const [editId, setEditId] = useState(null)

  const user = JSON.parse(localStorage.getItem("user"))
  const loggedInUserId = user?.id

  // fetch subjects
  const fetchSubjects = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/subjects?userId=${loggedInUserId}`
      )
      setSubjects(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [loggedInUserId])

  useEffect(() => {
    fetchSubjects()
  }, [fetchSubjects])

  // add OR update subject
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || Number(hours) <= 0) {
      return
    }

    try {
      if (editId) {
        // UPDATE
        await axios.put(`${API_URL}/subjects/${editId}`, {
          name: name.trim(),
          hours,
          userId: loggedInUserId
        })

        setEditId(null)
      } else {
        // ➕ ADD
        await axios.post(`${API_URL}/subjects`, {
          name: name.trim(),
          hours,
          userId: loggedInUserId
        })
      }

      setName("")
      setHours("")
      fetchSubjects()
    } catch (err) {
      console.log(err)
    }
  }

  // delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/subjects/${id}`)
      fetchSubjects()
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
    <Container className="mt-5 pt-4">
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
      <Row>
        {subjects.map((sub) => (
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