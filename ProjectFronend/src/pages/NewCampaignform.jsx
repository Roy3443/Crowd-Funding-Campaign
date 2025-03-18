import React, { useState } from "react";
import { Container, Form, Button, Alert, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StartCampaign = () => {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    companyName: "",
    image: "",
    description: "",
    fundingGoal: "",
    equityOffered: "",
    sharesTotal: "",
    sharesRemaining: "",
    startDate: "",
    endDate: "",
    status: "Active" 
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name !== "status") { 
      setCampaign({ ...campaign, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://localhost:7289/create", campaign, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: "success", text: response.data.message });
      setTimeout(() => navigate("/my-campaigns"), 2000);
    } catch (error) {
      setMessage({ type: "danger", text: "Failed to create campaign." });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", borderRadius: "12px" }}>
        <h2 className="text-center text-primary mb-4">Start a New Campaign</h2>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          {Object.keys(campaign).map((key) => (
            <Form.Group as={Row} className="mb-3" key={key}>
              <Form.Label column sm={4} className="text-end">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type={key.includes("Date") ? "date" : key.includes("Goal") || key.includes("Equity") || key.includes("Shares") ? "number" : "text"}
                  name={key}
                  value={campaign[key]}
                  onChange={handleChange}
                  required
                  readOnly={key === "status"} 
                />
              </Col>
            </Form.Group>
          ))}
          <div className="d-grid">
            <Button variant="primary" type="submit" className="rounded-pill">Start Campaign</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default StartCampaign;
