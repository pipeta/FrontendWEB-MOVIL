export enum TaskState {
    TODO = 'to_do',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

export interface Task {
    _id: string
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    state: TaskState;
    emailCreator: string;
    nameResponsible: string | null;
    id_proyect: string;
    is_deleted: boolean;
}

export interface Task2 {
    
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