
import React from 'react'
import { Navigator } from './src/navigator/Navigator'; // Asegúrate de proporcionar la ruta correcta al archivo del Navigator

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { TeamProvider } from './src/context/TeamContext';

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
        
      </AppState>
    </NavigationContainer>
  )
}

export default App;