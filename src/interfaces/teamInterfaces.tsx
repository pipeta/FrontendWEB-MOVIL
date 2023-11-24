export type Member = {
  _id: string;
  userName: string;
  email: string;
};

export type Team = {
  _id: string;
  name: string;
  autor: string;
  uniqueCode: string;
};

export type CreateTeamDto = {
  name: string;
};

export type CreateMemberReques = {
  uniqueCode: string;
  email: string
}


export type DeleteMemberDto = {
  uniqueCode: string;
  email: string
}