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
    
    // const checkToken = async() => {
    //     const token = await AsyncStorage.getItem('token');

        
        
    //     if(!token) return dispatch({type:'notAuthenticated'});

    //     const resp = await API.get("/auth/validate-token");
    //     console.log(resp)
    //     if(resp.status !== 200){
    //         return dispatch({type:'notAuthenticated'})
    //     }
    //     dispatch({
    //         type:'signUp',
    //         payload: {
    //             token:  resp.data.access_token,
    //             user:   resp.data.userData
    //         }
    //     })
    // }
    async function validarToken() {
        try {
          const token = await AsyncStorage.getItem('token');
          const resp = await API.post('/auth/validate-token',{token});
          
          const data = resp.data; // Aquí puedes acceder a la respuesta del servidor
            console.log('acaca')
            console.log(data)
            console.log('acaca')
          if (data.valid) {
            // El token es válido
            console.log('El token es válido');
            console.log(token)
            // await AsyncStorage.setItem('token',resp.data.token)

            dispatch({
                        type:'signUp',
                        payload: {
                            token:  resp.data.access_token,
                            user:   resp.data.userData
                        }
                    })
          } else {
            // El token no es válido
            console.log('El token no es válido');
            return dispatch({type:'notAuthenticated'});

          }
        } catch (error) {
          // Maneja errores aquí
          console.error('Error al validar el token:', error);
        }
      }
      
    

    const signUp = async({email,password,nombre}:RegisterData) =>{
        try{
            const resp = await API.post<LoginResponse>("/auth/register",{email,password,nombre}) // el authlogin revisa lo que sigue despues de la URl base
            console.log(resp)
            dispatch({
                type:'signUp',
                payload:{
                    token:  resp.data.access_token,
                    user:   resp.data.userData

                }
            });
            await AsyncStorage.setItem('token', resp.data.access_token)
            
        }catch(error){
            console.log(JSON.stringify(error))

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
            const resp = await API.post<LoginResponse>("/auth/login",{email,password}) // el authlogin revisa lo que sigue despues de la URl base
            console.log(resp)
            dispatch({
                type:'signUp',
                payload:{
                    token:  resp.data.access_token,
                    user:   resp.data.userData

                }
            });
            await AsyncStorage.setItem('token', resp.data.access_token)
            
        }catch(error){
            console.log(JSON.stringify(error))

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
            const resp = await API.post<LoginResponse>("/auth/recovery",{email}) // el authlogin revisa lo que sigue despues de la URl base
            console.log(resp.data) 
            
            
        }catch(error){
            console.log(error)
        }
    };
    const logOut = async() =>{
        await AsyncStorage.removeItem('token')
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
