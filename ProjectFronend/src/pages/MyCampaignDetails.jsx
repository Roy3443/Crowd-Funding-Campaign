import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, ListGroup, Spinner, Alert, ProgressBar, Row, Col } from "react-bootstrap";
import axios from "axios";

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInvestors, setShowInvestors] = useState(false);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://localhost:7289/fundraiser/campaigns/campaigndetails?CampaignId=${campaignId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCampaign(response.data);
      } catch (err) {
        setError("Failed to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  const sharesSold = campaign.sharesTotal - campaign.sharesRemaining;
  const sharesPercentage = (sharesSold / campaign.sharesTotal) * 100;
  const fundsPercentage = (campaign.fundsRaised / campaign.fundingGoal) * 100;

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-4">
        <Row>
          <Col md={4} className="text-center">
            <Card.Img
              variant="top"
              src={campaign.image}
              alt={campaign.companyName}
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
            />
          </Col>

 
          <Col md={8}>
            <h2 className="text-primary mb-3">{campaign.companyName}</h2>

            <div className="d-flex flex-column">
              {[
                { label: "Description", value: campaign.description },
                { label: "Funding Goal", value: `$${campaign.fundingGoal.toLocaleString()}` },
                { label: "Funds Raised", value: `$${campaign.fundsRaised.toLocaleString()}` },
                { label: "Equity Offered", value: `${campaign.equityOffered}%` },
                { label: "Shares Sold", value: `${sharesSold} / ${campaign.sharesTotal}` },
                { label: "Start Date", value: new Date(campaign.startDate).toLocaleDateString() },
                { label: "End Date", value: new Date(campaign.endDate).toLocaleDateString() },
                { label: "Status", value: <span className={`badge ${campaign.status === "Active" ? "bg-success" : "bg-danger"}`}>{campaign.status}</span> }
              ].map((item, index) => (
                <Row key={index} className="mb-2">
                  <Col sm={5} className="text-start"><strong>{item.label}:</strong></Col>
                  <Col sm={7} className="text-start">{item.value}</Col>
                </Row>
              ))}

           
              <Row className="mb-2">
                <Col sm={5} className="text-start"><strong>Funds Progress:</strong></Col>
                <Col sm={7}><ProgressBar now={fundsPercentage} label={`${fundsPercentage.toFixed(2)}%`} /></Col>
              </Row>

              <Row className="mb-2">
                <Col sm={5} className="text-start"><strong>Shares Progress:</strong></Col>
                <Col sm={7}><ProgressBar now={sharesPercentage} label={`${sharesPercentage.toFixed(2)}%`} /></Col>
              </Row>
            </div>

    
            <div className="text-end mt-3">
              <Button variant="primary" onClick={() => setShowInvestors(!showInvestors)}>
                {showInvestors ? "Hide Investors" : "See Who Invested"}
              </Button>
            </div>
          </Col>
        </Row>


        {showInvestors && (
          <div className="mt-4">
            <h4 className="text-secondary">Investors</h4>
            {campaign.campaignInvesters.length > 0 ? (
              <ListGroup>
                {campaign.campaignInvesters.map((investor, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center p-3">
                    <div>
                      <strong className="text-primary">{investor.investorName}</strong> <br />
                      Invested ${investor.amountInvested.toLocaleString()} on {new Date(investor.investmentDate).toLocaleDateString()}
                    </div>
                    <div className="text-end">
                      <span className="badge bg-info">{investor.shareBuyed} Shares</span> &nbsp;
                      <span className="badge bg-warning">{investor.equityOwned}% Equity</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert variant="warning" className="mt-3">No investors yet.</Alert>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
};

export default CampaignDetails;
