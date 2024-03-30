import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      bg={""}
      _hover={{ bg: "navy", color: "white" }}
      fontWeight={'bold'}
    >
      Get Started
    </Button>
  );
}
