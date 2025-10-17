import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { JSX } from "react";

interface PrivateRouteProps {
    children: JSX.Element
} 
function PrivateRoutes({ children }: PrivateRouteProps) {

    const token = Cookies.get('accessToken')

    if (!token) {
        return <Navigate to='/login' replace/>
    }
    
    return children // Logged-in
}

export default PrivateRoutes
