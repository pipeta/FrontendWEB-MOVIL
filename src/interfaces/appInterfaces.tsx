export interface LoginResponse{
    userName: Usuario;
    access_token: string;
}

export interface Usuario {
    userName:string;
    email:string;
    
    
}

export interface LoginData {
    email:string;
    password: string;

}
export interface ResetPasswordData {
    email:string;
    
}
export interface RegisterData {
    nombre:string;
    email:string;
    password: string;
}