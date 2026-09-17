import { useState } from "react"
import axios from "axios"
import { Form, Button, Alert, Card } from "react-bootstrap"
import API_URL from "../api"

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))

  const [name, setName] = useState(user?.name || "")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleUpdate = async (e) => {
    e.preventDefault()

    setMessage("")
    setError("")

    if (!name) {
      setError("Name is required")
      return
    }

    if (password && password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      const updatedUser = {
        ...user,
        name,
        ...(password && { password }),
      }

      await axios.put(
        `${API_URL}/users/${user.id}`,
        updatedUser
      )

      localStorage.setItem("user", JSON.stringify(updatedUser))

      setPassword("")
      setMessage("Profile updated successfully")
    } catch {
      setError("Profile update failed")
    }
  }

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h2>Profile</h2>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={user?.email || ""}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default Profile