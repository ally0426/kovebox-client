import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Exchange authorization code for access token
          const response = await fetch(
            `/api/auth/google/callback?code=${code}`
          );
          const data = await response.json();
          const { access_token } = data;

          if (access_token) {
            // Store access token in local storage and navigate back to home
            localStorage.setItem("google_access_token", access_token);
            navigate("/");
          }
        } catch (error) {
          console.error("Error exchanging code for access token:", error);
        }
      }
    };

    getAccessToken();
  }, [navigate]);

  return <div>Authenticating with Google...</div>;
};

export default AuthCallback;
