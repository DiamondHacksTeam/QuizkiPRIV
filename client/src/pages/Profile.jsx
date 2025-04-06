import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import "./profile.css";

async function getPoints(email) {
  let response = await fetch(`http://localhost:5050/records/users/${email}`);
  const result = await response.json();
  return result[0].points;
}

async function getNumCollected(email) {
  let response = await fetch(`http://localhost:5050/records/users/${email}`);
  const result = await response.json();
  return result[0].collected.length;
}

export const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const [points, setPoints] = useState(null);
  const [numCollected, setNumCollected] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      getPoints(user.email).then(
        (fetchedPoints) => {
          setPoints(fetchedPoints);
        },
        [isAuthenticated, user]
      );
    }
  });

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      getNumCollected(user.email).then(
        (fetchedNumCollected) => {
          setNumCollected(fetchedNumCollected);
        },
        [isAuthenticated, user]
      );
    }
  });

  if (isAuthenticated) {
    return (
      <div className="profileInfo">
        <h1>Welcome, {user.email}!</h1>
        <img
          src="../../public/defaultSmiski.png"
          className="profilePicture"
        ></img>
        <p>Points: {points !== null ? points : "Loading..."}</p>
        <p>
          Smiskis Collected:{" "}
          {numCollected !== null ? numCollected : "Loading..."}
        </p>
          <LogoutButton  additionalStyles="profile-button"/>
      </div>
    );
  } else {
    return (
      <div className="profileInfo">
        <p></p>
        <p>You must be logged in to access the profile page.</p>
          <LoginButton additionalStyles="profile-button"/>
      </div>
    );
  }
};
