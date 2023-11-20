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
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
    type ProyectContextProps = {
        createProyect: (createProyect: CreateProyect) => Promise<void>;
        getProyectByUser: () => Promise<Proyect[]>;
        updateProyect: (proyectId: string, updateProyect: UpdateProyect) => Promise<void>;
        removeProyect: (proyectId: string) => Promise<void>;
        addTeamToProyect: (newTeamProyect: NewTeamProyect) => Promise<void>;
        deleteTeamFromProyect: (teamId: string) => Promise<void>;
        getTeamsByProyect: (proyectId: string) => Promise<void>;
    };
  
  export const ProyectContext = createContext({} as ProyectContextProps);
  
  export const ProyectProvider = ({ children }: any) => {

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
        } catch (error) {
            console.error(error);
            throw error;
        } 
    };

    const getProyectByUser = async (): Promise<Proyect[]> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            console.log('aqerur')
            const config = {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await APIproyect.get("/proyect", config);
        
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
    
            const teams = resp.data;
            return teams;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    


    return (
      <ProyectContext.Provider
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
      </ProyectContext.Provider>
    );
  };