export interface Proyect{
    id: string;
    name: string;
    description: string;
    owner: string;
}
  
export interface TeamProyect{
    id: string;
    id_proyect: string;
    name: string;
}

export interface CreateProyect{
    name: string;
    description: string;
    owner: string;
}

export interface UpdateProyect {
    name: string;
    description: string;
}

export interface NewTeamProyect {
    uniqueCode: string;
    id_proyect: string;
}