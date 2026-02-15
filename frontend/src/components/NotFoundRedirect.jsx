import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NotFoundRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Page not found", { id: "not-found-error" });
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default NotFoundRedirect;
