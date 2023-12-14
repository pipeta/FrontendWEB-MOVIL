import React from "react";
import { Navigator } from "./src/navigator/Navigator";

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { TeamProvider } from "./src/context/TeamContext";
import { ProyectProvider } from "./src/context/ProyectContext";
import { TasksProvider } from "./src/context/TaskContext";
import { RolProvider } from "./src/context/RolContext";
import { CommentProvider } from "./src/context/CommentContext";
// import { TeamsNavigator } from './src/navigator/TeamsNavigator';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <TeamProvider>
        <ProyectProvider>
          <TasksProvider>
            <CommentProvider>
              <RolProvider>{children}</RolProvider>
            </CommentProvider>
          </TasksProvider>
        </ProyectProvider>
      </TeamProvider>
    </AuthProvider>
  );
};
export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
        {/* <TeamsNavigator/>
         */}
      </AppState>
    </NavigationContainer>
  );
};

export default App;
