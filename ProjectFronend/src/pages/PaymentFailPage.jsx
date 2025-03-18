import { Alert, Button, Container } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <Alert variant="danger" className="d-flex align-items-center justify-content-center">
        <BsXCircle className="me-2" size={24} />
        Payment Failed! Please try again.
      </Alert>

      <Button variant="primary" onClick={() => navigate("/")}>
        Go Back to Home
      </Button>
    </Container>
  );
};

export default PaymentCancelPage;
