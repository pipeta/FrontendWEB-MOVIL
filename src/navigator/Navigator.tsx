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
import TeamsScreen from "../screens/TeamsScreen";

// import { TeamsNavigator } from "./TeamsNavigator";


import { TeamsStackParams } from "./navigatorTypes";
import { PantallaPrueba } from "../screens/PantallaPrueba";
import PantallaPrueba2 from "../components/PantallaPrueba2";

import { CreateProjectScreen } from "../screens/CreateProjectScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import EditTeamsScreen from "../screens/EditTeamsScreen";
import AddTeamsScreen from "../screens/AddTeamsScreen";

import { CreateTask } from "../screens/CreateTask";
import { UpdateTask } from "../screens/UpdateTask";

import { DeleteTaskScreen } from "../screens/DeleteTaskScreen";
import { CreateTeamScreen } from "../screens/CreateTeamScreen";
import TaskDetailScreen from "../screens/TasksDetailScreen";
import { Tasks } from "../components/Tasks";
import { SearchScreen } from "../screens/SearchScreen";
import EditTestScreen from "../screens/EditTestScreen";
import { TaskCommentScreen } from "../screens/TaskCommentScreen";
// import { ViewTasks } from "../screens/ViewTasksScreen";

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
      <Drawer.Screen name="Eliminar Tarea" component={DeleteTaskScreen} />
      <Drawer.Screen name="Editar Tarea" component={UpdateTask} />

      <Drawer.Screen name="Crear Equipo" component={CreateTeamScreen} />
      <Drawer.Screen name="Ver Equipos" component={TeamsScreen} />

      <Drawer.Screen name="Crear Proyecto" component={CreateProjectScreen} />
      <Drawer.Screen name="Ver Proyectos" component={ProjectsScreen} />

      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="Editar perfil" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") return <LoadingScreen />;
  // if (status === "checking") return <Sidebar />;
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
          <Stack.Screen name="Ver Proyectos" component={ProjectsScreen} />
          <Stack.Screen name="EditTestScreen" component={EditTestScreen} />
          <Stack.Screen name="EditTeamsScreen" component={EditTeamsScreen} />
          <Stack.Screen name="PantallaPrueba" component={PantallaPrueba} />
         
          
          <Stack.Screen name="AddTeamsScreen" component={AddTeamsScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />

          <Stack.Screen name="CreateTask" component={CreateTask} />
          <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
          <Stack.Screen name="TaskCommentScreen" component={TaskCommentScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
