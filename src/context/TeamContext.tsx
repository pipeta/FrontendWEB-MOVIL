

import { Children, createContext, useContext, useEffect, useReducer, useState } from "react";
import { LoginData, LoginResponse, RegisterData, ResetPasswordData, Usuario } from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./AuthReducer";
import API from "../api/nestApi";
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TeamsContextProps = {
   teams:Usuario[],
   loadTeams: ()=> Promise<void>
   addMember: ( userName:string, rol:string) => Promise<void>
   updateTeam: ( name:string ,teamId:string) => Promise<void>
   deleteTeam: ( name:string) => Promise<void>
   loadTeamById: ( id:string) => Promise<Usuario>
}


export const TeamContext = createContext({} as TeamsContextProps);

export const TeamProvider = ({children}: any) => {


const  [teams,setTeams] = useState<Usuario[]>([])
const loadTeams=  async ()=> {

}
const  addMember= async ( userName:string, rol:string) => {

}
const  updateTeam= async( name:string ,teamId:string) => {

}
const deleteTeam= async( name:string) => {

}
const  loadTeamById= async ( id:string) => {
    throw new Error('asdasd')
}
    return (
        <TeamContext.Provider value={{
            teams,
            loadTeams,
            addMember,
            updateTeam,
            deleteTeam,
            loadTeamById, 
        }}>
            {children}
        </TeamContext.Provider>
    );
}
