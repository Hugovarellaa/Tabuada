import { useContext } from "react";
import { AuthContentx } from "../contexts/AuthContext";

export function useAuth (){
  const value =  useContext(AuthContentx)

  return value
}