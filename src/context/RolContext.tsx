// rolContext.tsx
import React, { createContext, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIteam from '../api/nestApiTeam';
import { BodyRol, CreateRolDto, Rol } from '../interfaces/rolInterfaces';

type RolContextProps = {
  getAllRoles: (id_team: string) => Promise<Rol[]>;
  createRole: (newRol: CreateRolDto) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
};

export const RolContext = createContext({} as RolContextProps);

export const RolProvider = ({ children } : any) => {
  const getAllRoles = async (id_team: string): Promise<Rol[]> => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      const response = await APIteam.get(`/rol/${id_team}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createRole = async (newRol: CreateRolDto): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      const response = await APIteam.post('/rol', newRol, { headers: { Authorization: `Bearer ${accessToken}` } });
      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteRole = async (id: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      const response = await APIteam.delete(`/rol/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <RolContext.Provider
      value={{
        getAllRoles,
        createRole,
        deleteRole,
      }}
    >
      {children}
    </RolContext.Provider>
  );
};
