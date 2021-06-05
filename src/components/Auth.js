import React, { useState } from "react";
import Signup from "./Signup";

const Auth = () => {
  const [auth, setAuth] = useState("SIGNUP");
  if (auth === "SIGNUP") {
    return <Signup setAuth={setAuth} />;
  } else {
    return "lgin";
  }
};

export default Auth;
