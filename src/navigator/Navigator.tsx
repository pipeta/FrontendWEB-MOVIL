import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProtectedScreen } from "../screens/WaitingScreen";
import { ResetPasswordScreen } from "../screens/RecoveryScreen";
import { AuthContext } from "../context/AuthContext";
import { LoadingScreen } from "../screens/LoadingScreen";
import DefaultScreen from "../screens/DefaultScree";
import { SettingsScreen } from "../screens/SettingsScreen";
import ManageTeam from "../screens/ManageTeam";
import Home from "../screens/Home";
import { TestingScreen } from "../screens/TestingScreen";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Sidebar = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="Crear Equipo" component={DefaultScreen} />
      <Drawer.Screen name="Editar perfil" component={SettingsScreen} />
      <Drawer.Screen name="Editar equipo" component={TestingScreen} />
      {/* <Drawer.Screen name="Editar equipo" component={ManageTeam}/> */}
    </Drawer.Navigator>
  );
};

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      {status !== "authenticated" ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Sidebar" component={Sidebar} />
        // <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      )}
    </Stack.Navigator>
  );
};
