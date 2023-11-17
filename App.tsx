
import React from 'react'
import { Navigator } from './src/navigator/Navigator'; 

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { TeamProvider } from './src/context/TeamContext';
// import { TeamsNavigator } from './src/navigator/TeamsNavigator';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <TeamProvider>
        {children}

      </TeamProvider>
    </AuthProvider>
  )
}
export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator/>
        {/* <TeamsNavigator/>
         */}
      </AppState>
    </NavigationContainer>
  )
}

export default App;