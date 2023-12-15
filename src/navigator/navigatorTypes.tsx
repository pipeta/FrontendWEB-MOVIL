// navigatorTypes.ts
type Team = {
  _id: string;
  name: string;
  autor: string;
  uniqueCode: string;
  listUser: {
    userName: string;
    email: string;
    _id: string;
  }[];
};
type Team2 = {
  _id: string;


};

enum TaskState {
  TODO = 'to_do',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
};

export type Task = {
  name: string;
  description: string;
  startDate:string;
  endDate:string;
  state: TaskState;
  emailCreator: string;
  nameResponsible: string | null;
  id_proyect: string;
  is_deleted: boolean;
}


type Project = {
  _id: string;
  name: string;
  description: string;
  owner: string;
};

type TeamsStackParams = {
  Sidebar: undefined;
  Testing2Screen: undefined;
  EditTestScreen:  {
    _id: string;
    name: string;
    autor: string;
    uniqueCode: string;
  };
  PantallaPrueba: Project;
  SearchScreen: { _id: string }; 
  EditTeamsScreen:  {
    _id: string;
    name: string;
    autor: string;
    uniqueCode: string;
  };
  CreateTask:{
    _id: string;
   
  };
  UpdateProyectScreen: {
    _id: string;
    name: string;
    description: string;
  }
  
  AddTeamsScreen: Team2;
  
  TaskDetailScreen: {
    _id: string
    description: string;
    emailCreator: string;
    endDate: string;
    id_proyect: string;
    is_deleted: boolean;
    name: string;
    nameResponsible: string | null;
    startDate: string;
    state: TaskState;
  };
  TaskCommentScreen: {
    _id: string
    description: string;
    emailCreator: string;
    endDate: string;
    id_proyect: string;
    is_deleted: boolean;
    name: string;
    nameResponsible: string | null;
    startDate: string;
    state: TaskState;
  };
  NewCommentScreen:{
    _id: string
    description: string;
    emailCreator: string;
    endDate: string;
    id_proyect: string;
    is_deleted: boolean;
    name: string;
    nameResponsible: string | null;
    startDate: string;
    state: TaskState;
  }
  Task: Task;
  

};

type DrawerParams = {
  Home: undefined;
  "Crear Equipo": undefined;
  "Editar perfil": undefined;
  "Editar equipo": undefined;
  Testing2Screen: undefined;
  "Ver Equipos": undefined;
  
  
};

export { TeamsStackParams, DrawerParams };