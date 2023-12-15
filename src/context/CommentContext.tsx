import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIproyect from "../api/nestApiProyect";
import { Comment, CreateCommentDto } from '../interfaces/comment.interfaces';

type CommentContextProps = {
  getComments: (id_task: string) => Promise<Comment[]>;
  createComment: (createCommentDto: CreateCommentDto) => Promise<Comment>;
  deleteComment: (id: string) => Promise<void>;
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
  
      const resp = await APIproyect.get(`/comment/${id_task}`, config);
      const comments: Comment[] = resp.data;
      return comments;
    } catch (error) {
      console.error(error);
      throw error;
    } 
  }

  const createComment = async (createCommentDto: CreateCommentDto): Promise<Comment> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const resp = await APIproyect.post('/comment', createCommentDto, config);
      const newComment: Comment = resp.data;
      
      return newComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const deleteComment = async (id: string) => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await APIproyect.delete(`/comment/${id}`, config);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <CommentContext.Provider
      value={{
        getComments,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};