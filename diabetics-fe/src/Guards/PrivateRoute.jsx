import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
    const user = sessionStorage.getItem("login");
    if (user) {
        return children;
    }
    return <Navigate to="/" replace></Navigate>
}