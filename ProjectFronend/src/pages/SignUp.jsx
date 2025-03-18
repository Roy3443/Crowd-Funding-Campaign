import React, { useState } from "react";
import { Form, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = { name, email, passwordHash, role };
      const response = await axios.post("https://localhost:7289/signup", formData);

      if (response.status === 200) {
        alert("Signup Successful!");
        localStorage.setItem("token", response.data);
        window.dispatchEvent(new Event("tokenUpdated"));
        navigate("/");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed! Please ensure you fill all the details");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
        <h3 className="text-center mb-4 text-primary">Sign Up</h3>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="text-secondary mb-0">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="ms-2"
                style={{ width: "75%" }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="text-secondary mb-0">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="ms-2"
                style={{ width: "75%" }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="text-secondary mb-0">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={passwordHash}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="ms-2"
                style={{ width: "75%" }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="text-secondary mb-0">Role</Form.Label>
              <div className="ms-2" style={{ width: "75%" }}>
                <Form.Check
                  type="radio"
                  label="Fundraiser"
                  name="role"
                  value="Fundraiser"
                  checked={role === "Fundraiser"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="Investor"
                  name="role"
                  value="Investor"
                  checked={role === "Investor"}
                  onChange={(e) => setRole(e.target.value)}
                  
                />
              </div>
            </div>
          </Form.Group>

          <Button type="submit" className="w-100" style={{ backgroundColor: "#007bff", border: "none", padding: "10px", borderRadius: "5px" }}>
            Sign Up
          </Button>
        </Form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default SignUp;
