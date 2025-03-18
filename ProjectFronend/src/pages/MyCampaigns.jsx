import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Spinner, Alert, Pagination } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCampaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7289/fundraiser/campaigns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(response.data);
      } catch (error) {
        setError("Failed to fetch campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleViewDetails = (campaignId) => {
    navigate(`/my-campaigns/${campaignId}`);
  };

  const handleDeleteCampaign = async (campaignId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmDelete) return;

    setDeleting(campaignId);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7289/fundraiser/campaigns/${campaignId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      setCampaigns((prev) => prev.filter((campaign) => campaign.campaignId !== campaignId));
    } catch (error) {
      setError("Failed to delete campaign.");
    } finally {
      setDeleting(null);
    }
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
      <h2 className="text-center text-primary mb-4">My Campaigns</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && campaigns.length === 0 && <Alert variant="info">No campaigns found.</Alert>}

      <Row className="g-4">
        {currentCampaigns.map((campaign) => (
          <Col key={campaign.campaignId} md={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={campaign.image}
                alt={campaign.companyName}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-primary">{campaign.companyName}</Card.Title>
                <Card.Text>
                  <strong>Funding Goal:</strong> ${campaign.fundingGoal.toLocaleString()} <br />
                  <strong>Funds Raised:</strong> ${campaign.fundsRaised.toLocaleString()} <br />
                  <strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" onClick={() => handleViewDetails(campaign.campaignId)}>
                    View Details
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteCampaign(campaign.campaignId)}
                    disabled={deleting === campaign.campaignId}
                  >
                    {deleting === campaign.campaignId ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
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

export default MyCampaigns;
