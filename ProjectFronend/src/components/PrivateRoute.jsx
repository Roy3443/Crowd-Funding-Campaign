import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ element, allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
            } catch (error) {
                console.error("Invalid token:", error);
                setUserRole(null);
            }
        }
    }, [token]);

    if (!token) return <Navigate to="/login" />;
    if (userRole === null) return <div>Loading...</div>; 
    if (!allowedRoles.includes(userRole)) {
        return (
            <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return element;
};

export default PrivateRoute;
