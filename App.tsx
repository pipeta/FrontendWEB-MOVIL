
import React from 'react'
import { Navigator } from './src/navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';
export const App = () => {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  )
}

export default App;