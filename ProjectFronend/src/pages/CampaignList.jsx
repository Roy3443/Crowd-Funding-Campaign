import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7289/", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    const fetchUserFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser({
            name: decodedToken.unique_name,
            role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          });
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };

    fetchCampaigns();
    fetchUserFromToken();
  }, []);

  const handleCardClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleInvest = (campaignId, e) => {
    e.stopPropagation();
    navigate(`/campaign/${campaignId}`);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">FundHive – The buzz of crowdfunding.</h2>
      <Row>
        {currentCampaigns.map((campaign) => {
          const fundingPercentage = ((campaign.fundsRaised / campaign.fundingGoal) * 100).toFixed(2);
          return (
            <Col key={campaign.campaignId} md={4} sm={6} xs={12} className="mb-4">
              <Card 
                className="shadow-sm" 
                onClick={() => handleCardClick(campaign.campaignId)} 
                style={{ cursor: "pointer" }} 
              >
                <Card.Img variant="top" src={campaign.image} alt={campaign.companyName} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{campaign.companyName}</Card.Title>
                  <Card.Text><strong>Ends On:</strong> {new Date(campaign.endDate).toLocaleDateString()}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <span className="text-success"><strong>Funds Raised: ${campaign.fundsRaised.toLocaleString()}</strong></span>
                    <span className="text-secondary"><strong>Goal: ${campaign.fundingGoal.toLocaleString()}</strong></span>
                  </div>
                  <ProgressBar
                    now={fundingPercentage}
                    label={`${fundingPercentage}%`}
                    variant="success"
                    animated
                    style={{ height: "18px", fontSize: "12px", marginTop: "5px" }}
                  />
                  <Button className="mt-3 w-100" onClick={(e) => handleInvest(campaign.campaignId, e)}>
                    Campaign Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
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

export default CampaignList;
