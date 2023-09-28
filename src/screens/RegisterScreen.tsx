import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background'
import { loginStyles } from '../theme/loginTheme'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({navigation}:Props) => {
    
    const {signUp,errorMessage,removeError} = useContext(AuthContext)
    useEffect(() => {
      
        if(errorMessage.length===0) return;
        console.log(errorMessage)
        Alert.alert('Registro incorrecto', errorMessage,
        [
            {
                text:'ok',
                onPress:removeError
            }
        ])
      
    }, [errorMessage])
    const {email,name,password,onChange} = useForm({
        email:'',
        password:'',
        name:''

    })

    const onRegister = () =>{
        console.log({email,password,name})
        Keyboard.dismiss();
        signUp({
            nombre:name,
            email:email,
            password: password,
        })
    }
    return (
        <>
    
            <Background/>
    
            <KeyboardAvoidingView
            style={{flex:1}}
            behavior={(Platform.OS === 'ios') ? 'padding': 'height'}
            >
    
                <View style={loginStyles.formContainer}>
    
                    <Text style={ loginStyles.title}>Registrar Usuario</Text>
                    

                    <Text style={ loginStyles.label}>Nombre:</Text>
                    <TextInput 
                                    placeholder="Ingrese su Nombre:"
                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                    
                                    underlineColorAndroid="white"
                                    style={[ 
                                        loginStyles.inputField,
                                        ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                    ]}
                                    selectionColor="white"
                                    
                                    onChangeText={(value)=> onChange(value,'name')}
                                    value={name}
                                    onSubmitEditing={onRegister}
                                    autoCapitalize="words"
                                    autoCorrect={ false }
                                />

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
                                    
                                    onChangeText={(value)=> onChange(value,'email')}
                                    value={email}
                                    onSubmitEditing={onRegister}
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
                        
                        onChangeText={(value)=> onChange(value,'password')}
                        value={password}
                        onSubmitEditing={onRegister}
                        autoCapitalize="none"
                        autoCorrect={ false }
                        />
    
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                            >
                            <Text style={loginStyles.buttonText}>Crear cuenta</Text>
    
    
                        </TouchableOpacity>
    
    
                    </View>
    
                    <TouchableOpacity
                        onPress={() => navigation.replace('LoginScreen')}
                        activeOpacity={0.8}
                        style={loginStyles.buttonReturn }

                      
                        >
                            <Text style={loginStyles.buttonText}>Volver</Text>
                        
                    </TouchableOpacity>
                
                </View>
    
            </KeyboardAvoidingView>
        </>
      )
}
