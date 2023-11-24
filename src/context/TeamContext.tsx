import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  LoginData,
  LoginResponse,
  RegisterData,
  ResetPasswordData,
  Usuario,
} from "../interfaces/appInterfaces";
import APIteam from "../api/nestApiTeam";
import { CreateMemberReques, CreateTeamDto, DeleteMemberDto, Member, Team } from "../interfaces/teamInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TeamsContextProps = {
  createTeam: (createTeamDto: string) => Promise<void>;
  fetchTeams: () => Promise<Team[]>;
  updateTeam: (id_team: string, name: string) => Promise<void>;
  deleteTeam: (name: string) => Promise<void>;
  loadTeamById: (id: string) => Promise<Usuario>;
  removeTeam: (uniqueCode: string) => Promise<void>;
  fetchTeamsFree: (id_proyect: string) => Promise<Team[]>;
  fetchMemberTeam: (id_team: string) => Promise<Member[]>;
  addUser: (data: CreateMemberReques) => Promise<void>;
  removeUser: (data: DeleteMemberDto) => Promise<void>;
};


export const TeamContext = createContext({} as TeamsContextProps);

export const TeamProvider = ({ children }: any) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const createTeam = async (name: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const resp = await APIteam.post(
        "/team",
        {
          name,
        },
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

  const fetchTeams = async (): Promise<Team[]> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await APIteam.get("/team", config);
      console.log(response);

      const teamsData: Team[] = response.data;

      return teamsData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeTeam = async (uniqueCode: string) => {
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
  const updateTeam = async (id_team: string, name: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      await APIteam.patch(`/team/${id_team}`, {name: name}, { headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const deleteTeam = async (name: string) => {};
  const loadTeamById = async (id: string) => {
    throw new Error("asdasd");
  };


  const fetchTeamsFree = async (id_proyect: string): Promise<Team[]> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await APIteam.get(`/team/teamfree/${id_proyect}`, config);
      console.log(response);

      const teamsData: Team[] = response.data;

      return teamsData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchMemberTeam = async (id_team: string): Promise<Member[]> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await APIteam.get(`/team/member/${id_team}`, config);

      const members: Member[] = response.data;

      return members;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }
  
  const addUser = async (data: CreateMemberReques): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      await APIteam.post("/team/member/adduser", data, { headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeUser = async (data: DeleteMemberDto): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      await APIteam.post("/team/member/remove-user", data, { headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <TeamContext.Provider
      value={{
        createTeam,
        fetchTeams,
        updateTeam,
        deleteTeam,
        loadTeamById,
        removeTeam,
        fetchTeamsFree,
        fetchMemberTeam,
        addUser,
        removeUser,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
