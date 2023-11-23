import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIproyect from "../api/nestApiProyect";

export interface Task {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  state: TaskState;
  creator: string;
  id_responsible: string | null;
  id_project: string;
  is_deleted: boolean;
}

export enum TaskState {
  TODO = 'to_do',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

type TasksContextProps = {
  createTask: (task: Task) => Promise<void>;
  fetchTasks: (id_project: string) => Promise<Task[]>;
  fetchTaskById: (id_task: string) => Promise<Task>;
  updateTask: (id_task: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id_task: string) => Promise<void>;
  initTask: (id_task: string) => Promise<void>;
  finishTask: (id_task: string) => Promise<void>;
  searchTasks: () => Promise<Task[]>;
};

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }:any) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = async (task: Task) => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const resp = await APIproyect.post("/task", task, config);
      console.log(resp);

      setTasks((prevTasks) => [...prevTasks, task]);
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
      setTasks(tasksData);

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

  const updateTask = async (id_task: string, task: Partial<Task>): Promise<void> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const resp = await APIproyect.patch(`/task/${id_task}`, task, config);
      console.log(resp);

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id_project === id_task ? { ...t, ...task } : t))
      );
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

      const resp = await APIproyect.delete(`/task/${id_task}`, config);
      console.log(resp);

      setTasks((prevTasks) => prevTasks.filter((t) => t.id_project !== id_task));
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

  const searchTasks = async (): Promise<Task[]> => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await APIproyect.get("/task/search", config);
      console.log(response);

      const tasksData: Task[] = response.data;
      setTasks(tasksData);

      return tasksData;
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
        searchTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
