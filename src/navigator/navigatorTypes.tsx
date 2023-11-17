// navigatorTypes.ts
type Team = {
    _id: string;
    name: string;
    autor: string;
    uniqueCode: string;
  };
  
  type TeamsStackParams = {
    Sidebar: undefined;
    Testing2Screen: undefined;
    EditTestScreen: Team; // Puedes definir los parámetros que necesites aquí
  };
  
  type DrawerParams = {
    Home: undefined;
    "Crear Equipo": undefined;
    "Editar perfil": undefined;
    "Editar equipo": undefined;
    Testing2Screen: undefined;
  };
  
  export { TeamsStackParams, DrawerParams };
  