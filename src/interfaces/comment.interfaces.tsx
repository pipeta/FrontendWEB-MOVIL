export interface Comment {
  _id: string;
  description: string;
  autorEmail: string;
  id_task: string;
}

export interface CreateCommentDto {
  description: string;
  id_task: string;
}