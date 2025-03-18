import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const response = await axios.get(`https://localhost:7289/investor/investments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setInvestments(response.data);
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };

    fetchInvestments();
  }, []);

  const handleMoreDetails = (campaignId) => {
    navigate(`/investment/${campaignId}`);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvestments = investments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(investments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">My Investments</h2>
      <Row>
        {currentInvestments.length === 0 ? (
          <p className="text-center">You have not made any investments yet.</p>
        ) : (
          currentInvestments.map((investment) => (
            <Col key={investment.investmentId} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img variant="top" src={investment.image} alt={investment.companyName} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{investment.companyName}</Card.Title>
                  <Card.Text><strong>Investment Amount:</strong> ${investment.amountInvested.toLocaleString()}</Card.Text>
                  <Card.Text><strong>Shares Bought:</strong> {investment.shareBuyed}</Card.Text>
                  <Card.Text><strong>Equity Owned:</strong> {investment.equityOwned}%</Card.Text>
                  <Button variant="primary" onClick={() => handleMoreDetails(investment.campaignId)}>
                    More Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

  
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
    </Container>
  );
};

export default InvestmentList;
