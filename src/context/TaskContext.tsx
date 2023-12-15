import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIproyect from "../api/nestApiProyect";
import { Task, TaskCreate, UpdateTaskDto } from "../interfaces/task.interfaces";


type TasksContextProps = {
  createTask: (task: TaskCreate) => Promise<void>;
  fetchTasks: (id_project: string) => Promise<Task[]>;
  fetchTaskById: (id_task: string) => Promise<Task>;
  updateTask: (id_task: string, task: Partial<UpdateTaskDto>) => Promise<void>;
  deleteTask: (id_task: string) => Promise<void>;
  initTask: (id_task: string) => Promise<void>;
  finishTask: (id_task: string) => Promise<void>;
};

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }:any) => {

  const createTask = async (task: TaskCreate) => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log('aca')
      console.log(task)
      console.log('aca')
      const resp = await APIproyect.post("/task", task, config);
      console.log(resp);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchTasks = async (id_project: string): Promise<Task[]> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await APIproyect.get(`/task/${id_project}`, config);
      console.log(response);

      const tasksData: Task[] = response.data;
      console.log(tasksData);

      return tasksData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchTaskById = async (id_task: string): Promise<Task> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await APIproyect.get(`/task/${id_task}`, config);
      console.log(response);

      return {} as Task;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateTask = async (id_task: string, task: Partial<UpdateTaskDto>): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log('updateTask recibió taskId en el contexto:', id_task);
      console.log(task)
      const resp = await APIproyect.patch(`/task/${id_task}`, task, config);
      console.log('--------')
      console.log(resp);
      console.log('--------')



    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTask = async (id_task: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log('deleteTask recibió taskId en el contexto:', id_task);
      const resp = await APIproyect.delete(`/task/${id_task}`, config);
      console.log('--------')
      console.log(resp);
      console.log('--------')
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const initTask = async (id_task: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const resp = await APIproyect.patch(`/task/init/${id_task}`, {}, config);
      console.log(resp);

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const finishTask = async (id_task: string): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const resp = await APIproyect.patch(`/task/finish/${id_task}`, {}, config);
      console.log(resp);

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <TasksContext.Provider
      value={{
        createTask,
        fetchTasks,
        fetchTaskById,
        updateTask,
        deleteTask,
        initTask,
        finishTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
export { Task };

