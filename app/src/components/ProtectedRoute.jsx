import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("userr"); // or use a token

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
