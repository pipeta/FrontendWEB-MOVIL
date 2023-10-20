

import { Children, createContext, useContext, useEffect, useReducer, useState } from "react";
import { LoginData, LoginResponse, RegisterData, ResetPasswordData, Usuario } from "../interfaces/appInterfaces";
import APIteam from "../api/nestApiTeam";
import { CreateTeamDto, Team } from "../interfaces/teamInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TeamsContextProps = {
    createTeam: (createTeamDto: CreateTeamDto)=> Promise<Team|undefined>
    fetchTeams: () => Promise<void>
    updateTeam: ( name:string ,teamId:string) => Promise<void>
    deleteTeam: ( name:string) => Promise<void>
    loadTeamById: ( id:string) => Promise<Usuario>
}


export const TeamContext = createContext({} as TeamsContextProps);

export const TeamProvider = ({children}: any) => {


const  [teams,setTeams] = useState<Team[]>([])
const createTeam = async (createTeamDto: CreateTeamDto) => {
    try {
      const response: Team = await APIteam.post('/api/teams', createTeamDto);
      return response
    } catch (error) {
      console.error(error);
    }
};

const fetchTeams = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        const config = {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await APIteam.get('/api/teams', config);
        setTeams(response.data);
    } catch (error) {
        console.error(error);
    }
  };
  const removeTeam = async (uniqueCode: string) => {
    try {
      const accessToken = 'tu-token-aqui'; // Reemplaza esto con tu token real
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await APIteam.delete(`/api/teams/${uniqueCode}`, config);
      // Puedes manejar la respuesta o simplemente completar la solicitud con éxito
    } catch (error) {
      console.error(error);
    }
  };
const  updateTeam= async( name:string ,teamId:string) => {

}
const deleteTeam= async( name:string) => {

}
const  loadTeamById= async ( id:string) => {
    throw new Error('asdasd')
}
    return (
        <TeamContext.Provider value={{
            createTeam,
            fetchTeams,
            updateTeam,
            deleteTeam,
            loadTeamById, 
        }}>
            {children}
        </TeamContext.Provider>
    );
}
