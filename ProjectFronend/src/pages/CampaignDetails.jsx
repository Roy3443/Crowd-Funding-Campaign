import React, { useEffect, useState } from "react";
import { Container, Card, Button, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvestmentForm from "../components/InvestmentForm";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem("token"); //helper function
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7289/campaign/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };



    const fetchUserRole = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchCampaignDetails();
    fetchUserRole();
  }, [id]);

  if (!campaign) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-secondary">Loading campaign details...</h4>
      </Container>
    );
  }

  const fundingPercentage = ((campaign.fundsRaised / campaign.fundingGoal) * 100).toFixed(2);
  const isFundraiser = userRole === "Fundraiser";

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow-lg p-4" style={{ width: "700px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
        <Card.Img
          variant="top"
          src={campaign.image}
          alt={campaign.companyName}
          style={{ height: "350px", objectFit: "cover", borderRadius: "10px" }}
        />
        <Card.Body>
          <h2 className="text-primary text-center">{campaign.companyName}</h2>
          <p className="text-muted text-center">{campaign.description}</p>
          <hr />
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span className="text-success"><strong>Funds Raised: ${campaign.fundsRaised.toLocaleString()}</strong></span>
              <span className="text-secondary"><strong>Goal: ${campaign.fundingGoal.toLocaleString()}</strong></span>
            </div>
            <ProgressBar
              now={fundingPercentage}
              label={`${fundingPercentage}%`}
              variant="success"
              animated
              style={{ height: "20px", fontSize: "14px", marginTop: "5px" }}
            />
          </div>
          <Card.Text className="text-dark">
            <strong className="text-secondary">Equity Offered:</strong> {campaign.equityOffered}% <br />
            <strong className="text-secondary">Shares Total:</strong> {campaign.sharesTotal} <br />
            <strong className="text-secondary">Shares Remaining:</strong> {campaign.sharesRemaining} <br />
            <strong className="text-secondary">Ends On:</strong> {new Date(campaign.endDate).toLocaleDateString()} <br />
            <strong className="text-secondary">Staus:</strong> {campaign.status} <br />

          </Card.Text>


          {!isFundraiser && campaign.status !== "Inactive" && campaign.status !== "Closed" && (
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  setShowModal(true);
                }
              }}
            >
              Invest Now
            </Button>
          )}
        </Card.Body>
      </Card>

      {showModal && token && (
        <InvestmentForm show={showModal} handleClose={() => setShowModal(false)} campaign={campaign} />
      )}
    </Container>
  );
};

export default CampaignDetails;
