import React, { useEffect } from "react";
import { useCtx } from "../store/userContext";
import { useNavigate, useParams } from "react-router-dom";

function UserPage() {
  const ctx = useCtx();
  const navigate = useNavigate();
  const routeInfo = useParams();
  useEffect(() => {
    if (!ctx.isAuthenticated) {
      navigate("/");
    }
  }, []);
  return <div>{`UserPage ${routeInfo.id}`}</div>;
}

export default UserPage;
