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


type TeamsStackParams = {
  Sidebar: undefined;
  Testing2Screen: undefined;
  EditTestScreen: Team; 
  PantallaPrueba: Project;
  SearchScreen: Team2;
  EditTeamsScreen: Team;
  AddTeamsScreen:  Team2

};

type Project = {
  _id: string;
  name: string;
  description: string;
  owner: string;
};

type DrawerParams = {
  Home: undefined;
  "Crear Equipo": undefined;
  "Editar perfil": undefined;
  "Editar equipo": undefined;
  Testing2Screen: undefined;
};

export { TeamsStackParams, DrawerParams };
