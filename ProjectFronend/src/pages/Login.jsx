import React, { useState } from "react";
import { Form, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = { email, password };
      const response = await axios.post("https://localhost:7289/login", formData);
      console.log(formData);
      console.log(response);

      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("token", response.data);
        window.dispatchEvent(new Event("tokenUpdated"));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
  
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
    console.log("Login Submitted");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
        <h3 className="text-center mb-4 text-primary">Login</h3>
        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="text-secondary mb-0">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="ms-2"
                style={{ width: "75%" }}
              />
            </div>
          </Form.Group>

          <Button type="submit" className="w-100" style={{ backgroundColor: "#007bff", border: "none", padding: "10px", borderRadius: "5px" }}>
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          New user? <Link to="/signup" className="text-primary">Sign Up</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
