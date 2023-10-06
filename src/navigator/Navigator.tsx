import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/WaitingScreen';
import { ResetPasswordScreen } from '../screens/RecoveryScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const  Navigator= ()=> {

    const {status} = useContext(AuthContext);

    if (status==='checking')return <LoadingScreen></LoadingScreen>
    
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor:'white'
            }
        }}
    >
        {
            (status !== 'authenticated') ? (
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                </>
            ) 
            :(

                <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
            )
        }
      
     
      
    </Stack.Navigator>
  );
}