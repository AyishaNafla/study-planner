import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/apiSlice";
import { login } from "../redux/authSlice";
import { Form, Button, Alert, Card } from "react-bootstrap";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (password && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!user?.id) {
      setError("Unable to identify the logged-in user. Please log in again.");
      return;
    }

    try {
      const updatedUser = {
        ...user,
        name: name.trim(),
        ...(password && { password }),
      };

      await updateUser({
        id: user.id,
        ...updatedUser,
      }).unwrap();

      // Update Redux state and localStorage together.
      dispatch(login(updatedUser));

      setPassword("");
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h2>Profile</h2>

        {message && (
          <Alert variant="success" role="status">
            {message}
          </Alert>
        )}

        {error && (
          <Alert variant="danger" role="alert">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage("");
                setError("");
              }}
              required
              minLength={2}
              autoComplete="name"
              aria-label="Full name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={user?.email || ""}
              disabled
              aria-label="Email address"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
                setError("");
              }}
              minLength={6}
              autoComplete="new-password"
              aria-label="New password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Profile;