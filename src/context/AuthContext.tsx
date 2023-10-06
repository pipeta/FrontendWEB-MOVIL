import { Children, createContext, useContext, useEffect, useReducer } from "react";
import { LoginData, LoginResponse, RegisterData, ResetPasswordData, Usuario } from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./AuthReducer";
import API from "../api/nestApi";
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    errorMessage: string;
    token: string|null;
    user: Usuario|null;
    status:'checking'|'authenticated' |'not-authenticated'
    signUp:(RegisterData:RegisterData) => void;
    signIn:(LoginData:LoginData) => void;
    logOut:() => void;
    removeError:() => void;
    resetPassword: (ResetPasswordData:ResetPasswordData) => void;
}

const AuthInicialState: AuthState= {
    status:'checking',
    token:null,
    user:null,
    errorMessage:''
}
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any)=> {

    const [state, dispatch] = useReducer(authReducer, AuthInicialState)

    useEffect(() => {
       validarToken()
       
    }, [])
    
    const validarToken = async() => {
        const token = await AsyncStorage.getItem('token');
        const resp = JSON.parse(await AsyncStorage.getItem('user') ?? "{}")
        
        console.log(resp)
        console.log(token)
        if(!token) return dispatch({type:'notAuthenticated'});

        // dispatch({
        //     type:'signUp',
        //     payload: {
        //         token:  token,
        //         user: {nombre: '',email:''}
        //     }
        // })
    }
   
      
    

    const signUp = async({email,password,nombre}:RegisterData) =>{
        try{

            const resp = await API.post<LoginResponse>("/auth/register",{email,password,userName:nombre}) 
            console.log(resp)
            dispatch({
                type:'signUp',
                payload:{
                    token:  resp.data.access_token,
                    user:   resp.data.userName

                }
            });
            await AsyncStorage.setItem('token', resp.data.access_token)
            await AsyncStorage.setItem('user', JSON.stringify(resp.data.userName))
            
            
        }catch(error){
            

            if(error instanceof AxiosError){
                console.log(error.response?.data.message)
                dispatch({
                type: 'addError',
                payload: error.response?.data.message  || 'Informacion incorrecta'
                })
            }
            
        }
    };
    const signIn = async({email,password}:LoginData) =>{
        try{
            const resp = await API.post<LoginResponse>("/auth/login",{email,password}) 
            console.log(resp)
            dispatch({
                type:'signUp',
                payload:{
                    token:  resp.data.access_token,
                    user:   resp.data.userName

                }
            });
            await AsyncStorage.setItem('token', resp.data.access_token)
            
        }catch(error){
            

            if(error instanceof AxiosError){
                console.log(error.response?.data.message)
                dispatch({
                type: 'addError',
                payload: error.response?.data.message  || 'Informacion incorrecta'
                })
            }
            
        }
    }
    const resetPassword = async({email}:ResetPasswordData) => {
        try{
            const resp = await API.post<LoginResponse>("/auth/recovery",{email}) 
            console.log(resp.data) 
            
            
        }catch(error){
            

            if(error instanceof AxiosError){
                console.log(error.response?.data.message)
                dispatch({
                type: 'addError',
                payload: error.response?.data.message  || 'Informacion incorrecta'
                })
            }
            
        }
    };
    const logOut = async() =>{
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        dispatch({type:'logout'})
    }
    const removeError = () =>{
        dispatch({
            type:'removeError'
        })
    }
    return(
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
            resetPassword

        }}>
            {children}
        </AuthContext.Provider>
    )
}
