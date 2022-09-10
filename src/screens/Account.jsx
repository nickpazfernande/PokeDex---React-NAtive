import { View } from "react-native";
import React, { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import UserData from "../components/auth/UserData";
import useAuth from "../hooks/useAuth";

export default function Account() {
  const {auth} = useAuth();
  
  useEffect(() => {
    
  }, [auth])
  
  return (
    <View>
      {auth ? <UserData /> : <LoginForm />}
    </View>
  );
}
 