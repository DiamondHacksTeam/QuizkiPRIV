import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  return <button className={props.additionalStyles} onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;
