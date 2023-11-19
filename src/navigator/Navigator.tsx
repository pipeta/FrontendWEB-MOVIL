import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProtectedScreen } from "../screens/WaitingScreen";
import { ResetPasswordScreen } from "../screens/RecoveryScreen";
import { AuthContext } from "../context/AuthContext";
import { LoadingScreen } from "../screens/LoadingScreen";

import { SettingsScreen } from "../screens/SettingsScreen";
import ManageTeam from "../screens/ManageTeam";
import Home from "../screens/Home";
import { TestingScreen } from "../screens/TestingScreen";
import { Testing2Screen } from "../screens/Testing2Screen";

// import { TeamsNavigator } from "./TeamsNavigator";
import { DefaultScreen } from "../screens/DefaultScree";
import { EditTestScreen } from "../screens/EditTestScreen";
import { TeamsStackParams } from "./navigatorTypes";
import { PantallaPrueba } from "../screens/PantallaPrueba";
import PantallaPrueba2 from "../screens/PantallaPrueba2";
import AddMembersScreen from "../screens/AddMembersScreen";
import { CreateProjectScreen } from "../screens/CreateProjectScreen";



const Stack = createStackNavigator<TeamsStackParams>();
const Drawer = createDrawerNavigator();

const Sidebar = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#1f1f1f",
          width: 240,
        },
        drawerLabelStyle: {
          color: "white",
        },
      }}
    >
      <Drawer.Screen name="Crear Equipo" component={DefaultScreen} />
      <Drawer.Screen name="PantallaPrueba" component={PantallaPrueba} />
      <Drawer.Screen name="Crear Proyecto" component={CreateProjectScreen} />
      <Drawer.Screen name="Editar equipo" component={TestingScreen} />
      <Drawer.Screen name="Testing2Screen" component={Testing2Screen} />
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="Editar perfil" component={SettingsScreen} />
      <Drawer.Screen name="PantallaPrueba2" component={PantallaPrueba2} />
      <Drawer.Screen name="AddMembers" component={AddMembersScreen} />

    </Drawer.Navigator>
  );
};



export const Navigator = () => {
  const { status } = useContext(AuthContext);

  // if (status === "checking") return <LoadingScreen />;
  if (status === "checking") return <Sidebar />;
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
        <>
          <Stack.Screen
            name="Sidebar"
            component={Sidebar}
            options={{
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: "#1f1f1f",
              }, 
            }}
          />
          <Stack.Screen name="Testing2Screen" component={Testing2Screen} />
          <Stack.Screen
            name="EditTestScreen"
          
            component={EditTestScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
