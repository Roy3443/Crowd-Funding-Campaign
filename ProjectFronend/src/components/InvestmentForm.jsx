import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const InvestmentForm = ({ show, handleClose, campaign }) => {
    const [sharesToBuy, setSharesToBuy] = useState("");
    const [investmentDetails, setInvestmentDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("investmentDetails Updated:", investmentDetails);
    }, [investmentDetails]);

    const handleCalculateInvestment = async () => {
        const shares = parseInt(sharesToBuy, 10);

        if (!sharesToBuy || shares <= 0 || shares > campaign.sharesRemaining) {
            alert("Please enter a valid number of shares.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://localhost:7289/investments/calculate",
                {
                    totalShares: campaign.sharesTotal,
                    sharesToBuy: shares,
                    fundingGoal: campaign.fundingGoal,
                    equityOffered: campaign.equityOffered,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInvestmentDetails(response.data);
        } catch (error) {
            console.error("Error calculating investment:", error);
            alert("Failed to calculate investment.");
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToPay = async () => {
        if (!investmentDetails) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://localhost:7289/investments/process-payment",
                {
                    campaignId: campaign.campaignId,
                    amountInvested: investmentDetails.investmentAmount,
                    investmentDate: new Date().toISOString(), 
                    shareBuyed: parseInt(sharesToBuy),
                    equityOwned: investmentDetails.investorEquity,
                    createdAt: new Date().toISOString(), 
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!response.data.sessionId) {
                throw new Error("Stripe sessionId is missing.");
            }
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Invest in {campaign.companyName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Form>
               
                    {[
                        { label: "Company Name", value: campaign.companyName },
                        { label: "Funding Goal", value: `$${campaign.fundingGoal.toLocaleString()}` },
                        { label: "Amount Raised", value: `$${campaign.fundsRaised.toLocaleString()}` },
                        { label: "End Date", value: new Date(campaign.endDate).toLocaleDateString() },
                        { label: "Shares Total", value: campaign.sharesTotal },
                        { label: "Shares Remaining", value: campaign.sharesRemaining },
                    ].map((field, index) => (
                        <Form.Group className="mb-2" key={index}>
                            <Form.Label className="fw-bold">{field.label}</Form.Label>
                            <Form.Control type="text" value={field.value} disabled className="bg-light" />
                        </Form.Group>
                    ))}

                
                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">Shares to Buy</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            max={campaign.sharesRemaining}
                            value={sharesToBuy}
                            onChange={(e) => setSharesToBuy(e.target.value)}
                            className="bg-white"
                        />
                    </Form.Group>

                    <Button className="mt-3 w-100 btn-success" onClick={handleCalculateInvestment} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Calculate Equity & Amount"}
                    </Button>

                    <div className="border-top mt-4 pt-3">
                        <Form.Group className="mb-2">
                            <Form.Label className="fw-bold">Equity Received</Form.Label>
                            <Form.Control
                                type="text"
                                value={investmentDetails?.investorEquity ? `${investmentDetails.investorEquity}%` : ""} 
                                disabled
                                className="bg-light"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Amount to Pay</Form.Label>
                            <Form.Control
                                type="text"
                                value={investmentDetails?.investmentAmount ? `$${investmentDetails.investmentAmount}` : ""} 
                                disabled
                                className="bg-light"
                            />
                        </Form.Group>
                    </div>

                  
                    <Button
                        className="mt-3 w-100 btn-primary"
                        onClick={handleProceedToPay}
                        disabled={!investmentDetails}
                    >
                        Pay Now
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default InvestmentForm;
