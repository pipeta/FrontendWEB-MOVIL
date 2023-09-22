import React from 'react'
import { Platform, Text, TextInput } from 'react-native'
import { Background } from '../components/Background'
import { loginStyles } from '../theme/loginTheme'


export const LoginScreen = () => {
  return (
    <>

        <Background/>

        <Text style={ loginStyles.title}>Login</Text>

        <Text style={ loginStyles.label}>Email:</Text>
        <TextInput 
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                       

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />


                    <Text style={ loginStyles.label }>Contraseña:</Text>
                    <TextInput 
                        placeholder="******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

    </>
  )
}
