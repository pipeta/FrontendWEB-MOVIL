
import React from 'react'
import { Navigator } from './src/navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      {children}
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