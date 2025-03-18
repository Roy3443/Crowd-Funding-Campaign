import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs"; 
const InvestmentPaymentsPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      console.log("hiii");
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7289/investments/user-payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaymentData(response.data);
        console.log("Dataa", paymentData);
      } catch (error) {
        console.error("Error fetching investment payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (!paymentData) return <p>No investment payments found.</p>;

  return (
    <div className="container">
    
      <Alert variant="success" className="d-flex align-items-center justify-content-center text-center">
        <BsCheckCircle className="me-2" size={24}  /> 
        Payment Successful!
      </Alert>

      <h2 className="mb-4 text-center">Payment Receipt</h2>

      <Card className="m-3 p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-4 text-primary">Your Payment Details</Card.Title>

        
          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Transaction ID:</Col>
            <Col xs={8}>{paymentData.transactionId}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Payment Method:</Col>
            <Col xs={8}>{paymentData.paymentMethod}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Status:</Col>
            <Col xs={8} className={paymentData.paymentStatus === "Success" ? "text-success fw-bold" : "text-danger fw-bold"}>
              {paymentData.paymentStatus}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Investment Amount:</Col>
            <Col xs={8}>${paymentData.amountInvested}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Shares Bought:</Col>
            <Col xs={8}>{paymentData.shareBuyed}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Equity Owned:</Col>
            <Col xs={8}>{paymentData.equityOwned}%</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-bold">Investment Date:</Col>
            <Col xs={8}>{new Date(paymentData.investmentDate).toLocaleDateString()}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InvestmentPaymentsPage;
