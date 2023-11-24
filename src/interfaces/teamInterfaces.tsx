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
