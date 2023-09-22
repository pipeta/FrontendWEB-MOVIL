import { Children, createContext, useReducer } from "react";
import { LoginData, LoginResponse, Usuario } from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./AuthReducer";
import API from "../api/nestApi";

type AuthContextProps = {
    errorMessage: string;
    token: string|null;
    user: Usuario|null;
    status:'checking'|'authenticated' |'not-authenticated'
    signUp:() => void;
    signIn:(LoginData:LoginData) => void;
    logOut:() => void;
    removeError:() => void;
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

    const signUp = async({email,password}:LoginData) =>{
        try{
            const resp = await API.post<LoginResponse>("/auth/login",{email,password}) // el authlogin revisa lo que sigue despues de la URl base
            console.log(resp.data) 
        }catch(error){

        }
    }
    const signIn = () =>{}
    const logOut = () =>{}
    const removeError = () =>{}
    return(
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError

        }}>
            {children}
        </AuthContext.Provider>
    )
}
