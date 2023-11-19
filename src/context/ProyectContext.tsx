import {
    Children,
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
  } from "react";
  import {
    CreateProyect,
    NewTeamProyect,
    Proyect,
    TeamProyect,
    UpdateProyect
  } from "../interfaces/proyectInterfaces";
  import APIproyect from "../api/nestApiProyect";
  import { CreateTeamDto, Team } from "../interfaces/teamInterfaces";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
    type TeamsContextProps = {
        createProyect: (createProyect: CreateProyect) => Promise<void>;
        getProyectByUser: () => Promise<Proyect[]>;
        updateProyect: (proyectId: string, updateProyect: UpdateProyect) => Promise<void>;
        removeProyect: (proyectId: string) => Promise<void>;
        addTeamToProyect: (newTeamProyect: NewTeamProyect) => Promise<void>;
        deleteTeamFromProyect: (teamId: string) => Promise<void>;
        getTeamsByProyect: (proyectId: string) => Promise<void>;
    };
  
  export const TeamContext = createContext({} as TeamsContextProps);
  
  export const TeamProvider = ({ children }: any) => {
    const [teams, setTeams] = useState<Team[]>([]);

    const createProyect = async (createProyect: CreateProyect): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            };
        
            const resp = await APIproyect.post(
                "/proyect",
                createProyect,
                {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                }
            );
            console.log(resp);
        } catch (error) {
            console.error(error);
            throw error;
        } 
    };

    const getProyectByUser = async (): Promise<Proyect[]> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
        
            const config = {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await APIproyect.get("/proyect", config);
            console.log(response);
        
            const proyects: Proyect[] = response.data;
        
            return proyects;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateProyect = async (proyectId: string, updateProyect: UpdateProyect): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
    
            const resp = await APIproyect.patch(
                `/proyect/${proyectId}`,
                updateProyect,
                config
            );
            console.log(resp);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    const removeProyect = async (proyectId: string): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
    
            const resp = await APIproyect.delete(`/proyect/${proyectId}`, config);
            console.log(resp);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    const addTeamToProyect = async (newTeamProyect: NewTeamProyect): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
    
            const resp = await APIproyect.post(
                "/proyect/addteam",
                newTeamProyect,
                config
            );
            console.log(resp);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    const deleteTeamFromProyect = async (teamId: string): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
    
            const resp = await APIproyect.delete(`/proyect/deleteteam/${teamId}`, config);
            console.log(resp);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    const getTeamsByProyect = async (proyectId: string): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
    
            const resp = await APIproyect.get(`/proyect/teams/${proyectId}`, config);
            console.log(resp);
    
            const teams = resp.data;
            return teams;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    


    return (
      <TeamContext.Provider
        value={{
            createProyect,
            getProyectByUser,
            updateProyect,
            removeProyect,
            addTeamToProyect,
            deleteTeamFromProyect,
            getTeamsByProyect,
        }}
      >
        {children}
      </TeamContext.Provider>
    );
  };