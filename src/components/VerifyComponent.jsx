
import { Navigate, useLocation } from 'react-router-dom';

export default function VerifyComponent({ children }) {
    const location = useLocation();

    // Debug
    //console.log("[Authenticate] State.", location.state);
    //console.log("[Authenticate] Task ID.", location.state.id);

    if (!(location.state && location.state.id))
        return <Navigate to="/" replace />;

    return children;
}