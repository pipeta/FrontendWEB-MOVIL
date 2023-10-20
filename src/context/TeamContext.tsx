

import { Children, createContext, useContext, useEffect, useReducer, useState } from "react";
import { LoginData, LoginResponse, RegisterData, ResetPasswordData, Usuario } from "../interfaces/appInterfaces";
import APIteam from "../api/nestApiTeam";
import { CreateTeamDto, Team } from "../interfaces/teamInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TeamsContextProps = {
    createTeam: (createTeamDto: string)=> Promise<void>
    fetchTeams: () => Promise<TeamData[]>;
    updateTeam: ( name:string ,teamId:string) => Promise<void>
    deleteTeam: ( name:string) => Promise<void>
    loadTeamById: ( id:string) => Promise<Usuario>
    removeTeam: (uniqueCode: string) => Promise<void>
}
interface TeamData {
    _id: string;
    name: string;
    autor: string;
    uniqueCode: string;
    listUser: {
        userName: string;
        email: string;
        _id: string;
    }[];
}

export const TeamContext = createContext({} as TeamsContextProps);

export const TeamProvider = ({children}: any) => {


const  [teams,setTeams] = useState<Team[]>([])

const createTeam = async (name: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      const resp = await APIteam.post('/team', {
        name
        
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Agrega el token al encabezado de la solicitud
        },
      });
      console.log(resp)
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const fetchTeams = async (): Promise<TeamData[]> => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        console.log(accessToken)
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await APIteam.get('/team', config);
        console.log(response);

        const teamsData: TeamData[] = response.data;
        
        return teamsData;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

  const removeTeam = async (uniqueCode: string) => {
    console.log(`/team/${uniqueCode}`)
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await APIteam.delete(`/team/${uniqueCode}`, config);
      console.log(response);
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
            removeTeam
        }}>
            {children}
        </TeamContext.Provider>
    );
}
