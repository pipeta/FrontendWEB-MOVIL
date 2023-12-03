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
  startDate: Date;
  endDate: Date;
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
  EditTestScreen: Team; 
  PantallaPrueba: Project;
  SearchScreen: { _id: string }; 
  EditTeamsScreen: Team;
  AddTeamsScreen: Team2;
  TaskDetailScreen: {
    description: string;
    emailCreator: string;
    endDate: Date;
    id_proyect: string;
    is_deleted: boolean;
    name: string;
    nameResponsible: string | null;
    startDate: Date;
    state: TaskState;
  };
  Task: Task;
};

type DrawerParams = {
  Home: undefined;
  "Crear Equipo": undefined;
  "Editar perfil": undefined;
  "Editar equipo": undefined;
  Testing2Screen: undefined;
};

export { TeamsStackParams, DrawerParams };