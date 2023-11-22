export interface Proyect{
    _id: string;
    name: string;
    description: string;
    owner: string;
}
  
export interface TeamProyect{
    _id: string;
    name: string;
    autor: string;
    uniqueCode: string;
    listUser: {
      userName: string;
      email: string;
      _id: string;
    }[];
}

export interface CreateProyect{
    name: string;
    description: string;
}

export interface UpdateProyect {
    name: string;
    description: string;
}

export interface NewTeamProyect {
    uniqueCode: string;
    id_proyect: string;
}