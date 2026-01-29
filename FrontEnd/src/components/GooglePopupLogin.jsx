import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { CommentContext } from "../context/CommentAuthContext.jsx";
import { dataContext } from "../context/UserContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const GooglePopupLogin = ({ onSuccess }) => {
  const { setUser } = useContext(CommentContext);
  const { serverUrl } = useContext(dataContext);

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const { data } = await axios.post(
            `${serverUrl}/api/auth/google`,
            {
              idToken: credentialResponse.credential
            },
            { withCredentials: true }
          );

          setUser(data.user);
          toast.success("Logged in successfully!");
          onSuccess?.();

        } catch (err) {
          toast.error("Login failed");
        }
      }}
      onError={() => toast.error("Google login failed")}
    />
  );
};

export default GooglePopupLogin;
