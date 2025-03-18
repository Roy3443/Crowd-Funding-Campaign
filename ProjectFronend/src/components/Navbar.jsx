import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavigationBar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);

                setUser({
                    name: decodedToken.unique_name,
                    role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                });
            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserFromToken();
        const handleTokenUpdate = () => fetchUserFromToken();
        window.addEventListener("tokenUpdated", handleTokenUpdate);

        return () => window.removeEventListener("tokenUpdated", handleTokenUpdate);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const handleStartCampaign = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        navigate("/start-campaign"); 
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">FundHive</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user?.role !== "Investor" && (
                            <Button
                                variant="outline-light"
                                className="me-3"
                                onClick={handleStartCampaign}>
                                Start a Campaign
                            </Button>
                        )}
                        {user ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ minWidth: "150px", textAlign: "center" }}>
                                    {user.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {user.role === "Investor" ? (
                                        <Dropdown.Item onClick={() => navigate("/investor/investments")}>
                                            My Investments
                                        </Dropdown.Item>
                                    ) : (
                                        <Dropdown.Item onClick={() => navigate("/my-campaigns")}>
                                            My Campaigns
                                        </Dropdown.Item>
                                    )}
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        ) : (
                            <Button variant="light" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
