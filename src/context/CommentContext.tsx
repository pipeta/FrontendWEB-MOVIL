import {
    createContext
} from "react";

import { Comment } from '../interfaces/comment.interfaces';
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIproyect from "../api/nestApiProyect";
  
    type CommentContextProps = {
        getComments: (id_task: string) => Promise<Comment[]>;
    };
  
  export const CommentContext = createContext({} as CommentContextProps);
  
  export const CommentProvider = ({ children }: any) => {
    const getComments = async (id_task: string): Promise<Comment[]> => {
        try {
            const accessToken = await AsyncStorage.getItem("token");
            const config = {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            };
        
            const resp = await APIproyect.get(`/comment/${id_task}`,config);

            const comments: Comment[] = resp.data;
            return comments;
        } catch (error) {
            console.error(error);
            throw error;
        } 
    }


    return (
      <CommentContext.Provider
        value={{
            getComments,

        }}
      >
        {children}
      </CommentContext.Provider>
    );
  };