import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const InvestmentDetails = () => {
  const { campaignId } = useParams();
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestmentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://localhost:7289/investor/${campaignId}/investmentdetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestment(response.data);
      } catch (error) {
        console.error("Error fetching investment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentDetails();
  }, [campaignId]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (!investment) {
    return <p className="text-center mt-5">Investment details not found.</p>;
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">Investment Details</h2>
      <Card className="shadow-sm p-4">
        <div className="d-flex flex-column align-items-center">
          <Card.Img variant="top" src={investment.image} alt={investment.companyName} style={{ width: "300px", height: "200px", objectFit: "cover" }} />
          <h4 className="mt-3">{investment.companyName}</h4>
        </div>

        <Card.Body>
          <Table bordered hover>
            <tbody>
              <tr><td><strong>Total Investment:</strong></td><td>${investment.totalAmountInvested.toLocaleString()}</td></tr>
              <tr><td><strong>Total Shares Bought:</strong></td><td>{investment.totalSharesBought}</td></tr>
              <tr><td><strong>Total Equity Owned:</strong></td><td>{investment.totalEquityOwned}%</td></tr>
              <tr><td><strong>Funding Goal:</strong></td><td>${investment.fundingGoal.toLocaleString()}</td></tr>
              <tr><td><strong>Funds Raised:</strong></td><td>${investment.fundsRaised.toLocaleString()}</td></tr>
              <tr><td><strong>Equity Offered:</strong></td><td>{investment.equityOffered}%</td></tr>
              <tr><td><strong>Start Date:</strong></td><td>{new Date(investment.startDate).toLocaleDateString()}</td></tr>
              <tr><td><strong>End Date:</strong></td><td>{new Date(investment.endDate).toLocaleDateString()}</td></tr>
              <tr><td><strong>Status:</strong></td><td>{investment.status}</td></tr>
            </tbody>
          </Table>

          <h5 className="text-center mt-4">Investment History</h5>
          {investment.multipleInvestment.length > 0 ? (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Payment Method</th>
                  <th>Amount Invested</th>
                  <th>Shares Bought</th>
                  <th>Equity Owned</th>
                </tr>
              </thead>
              <tbody>
                {investment.multipleInvestment.map((inv, index) => (
                  <tr key={index}>
                    <td>{new Date(inv.investmentDate).toLocaleDateString()}</td>
                    <td>{inv.transactionId}</td>
                    <td>{inv.paymentMethod}</td>
                    <td>${inv.amountInvested.toLocaleString()}</td>
                    <td>{inv.shareBuyed}</td>
                    <td>{inv.equityOwned}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No previous investments found.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InvestmentDetails;
