import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  useLazyCheckEmailQuery,
  useRegisterUserMutation,
} from "../redux/apiSlice"
import capitalizeWords from "../utils/formatText";

function Register() {

  const navigate = useNavigate()
  const [checkEmail] = useLazyCheckEmailQuery()
  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const handleRegister = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setError("")

    try {
      const existingUsers = await checkEmail(email.trim()).unwrap()

      if (existingUsers.length > 0) {
        setError("Email already registered")
        return
      }

      await registerUser({
        name: capitalizeWords(name),
        email: email.trim(),
        password,
      }).unwrap()

      navigate("/")
    } catch {
      setError("Registration failed. Please try again.")
    }
  }


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
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

          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </Form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )

}

export default Register
