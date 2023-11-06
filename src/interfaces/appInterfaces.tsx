export interface LoginResponse {
  access_token: string;
  userName: string;
  email: string;
}
export interface RegisterResponse {
  access_token: string;
  userName: string;
  email: string;
}
export interface UpdateResponse {
  access_token: string;
  password: string;
  userName: string;
  email: string;
}
export interface Usuario {
  userName: string;
  email: string;
}

export interface Update {
  userName?: string;
  email?: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface ResetPasswordData {
  email: string;
}
export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}

/// Parte de los equipos

export interface TeamsResponse {
  name: string;
  teams: Usuario[];
}
