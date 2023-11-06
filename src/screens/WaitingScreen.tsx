import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const ProtectedScreen = () => {
  const { user, status } = useContext(AuthContext);

  return <h1>{status}</h1>;
};
