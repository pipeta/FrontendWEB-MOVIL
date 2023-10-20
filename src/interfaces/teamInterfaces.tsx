export type Member =  {
    id: string;
    username: string;
    email: string;
}

export type Team = {
    id: string;
    name: string;
    author: string;
    uniqueCode: string;
    members: Member[];
}

export type CreateTeamDto = {
    name: string;
}