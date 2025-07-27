import {react, useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoutes = ({children})=>{
    const {isAuthenticated} = useContext(AuthContext);
    console.log("isAuthenticated:---------", isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;