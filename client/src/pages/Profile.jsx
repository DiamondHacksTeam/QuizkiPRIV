import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import "./profile.css";

export const Profile = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="profileInfo">
        <p>Welcome, {user.email}</p>
        <div className="profilePicture"></div>
        <p>Points: {user.points}</p>
        <p>Smiskis Collected: {user.numCollected}</p>
        <LogoutButton />
      </div>
    );
  } else {
    return (
      <div>
        <LoginButton />
      </div>
    );
  }
};
