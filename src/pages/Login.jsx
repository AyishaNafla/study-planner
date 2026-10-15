import { Container, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useLazyGetUserByEmailQuery } from "../redux/apiSlice"
import { useDispatch } from "react-redux"
import { login } from "../redux/authSlice"

function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [getUserByEmail, { isLoading }] = useLazyGetUserByEmailQuery()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password) {
      setError("All fields are required")
      return
    }

    setError("")

    try {
      const res = await getUserByEmail(email.trim()).unwrap()
      const user = res[0]

      if (!user || user.password !== password) {
        setError("Invalid credentials")
        return
      }

      dispatch(login(user))
      navigate("/dashboard")
    } catch {
      setError("Login failed. Please try again.")
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

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
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
