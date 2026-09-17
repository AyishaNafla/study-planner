import { Container, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import API_URL from "../api"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    try {
      const res = await axios.get(
        `${API_URL}/users?email=${email}`
      )

      const user = res.data[0]

      if (!user || user.password !== password) {
        setError("Invalid credentials")
        return
      }

      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard")

    } catch {
      setError("Login failed")
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )

}

export default Login
