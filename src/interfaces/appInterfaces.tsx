export interface LoginResponse{
    userData: Usuario;
    access_token: string;
}

export interface Usuario {
    // rol:string;
    // estado:boolean;
    // google:boolean;
    userName:string;
    email:string;
    // uid:string;
    // img?:string;
    
}

export interface LoginData {
    email:string;
    password: string;

}
export interface ResetPasswordData {
    email:string;
    
}