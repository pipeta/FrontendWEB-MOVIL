export enum TaskState {
    TODO = 'to_do',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

export interface Task {
    _id: string
    name: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
    state: TaskState;
    emailCreator: string;
    nameResponsible: string | null;
    id_proyect: string;
    is_deleted: boolean;
}

export interface TaskCreate {
    
    name: string;
    description: string;
    startDate: string| null;
    endDate: string | null;
    state: TaskState;
    emailCreator: string;
    nameResponsible: string | null;
    id_proyect: string;
    is_deleted: boolean;
}

export interface UpdateTaskDto {
    name?: string;

    description?: string;

    nameResponsible?: string | null;

    startDate?: string | null;

    endDate?: string | null;

    state?: string | null;

    emailCreator?: string | null
  }

