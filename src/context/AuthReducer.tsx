import { Usuario } from "../interfaces/appInterfaces";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
}

type AuthAction =
  | { type: "signUp"; payload: { token: string; user: Usuario } }
  | { type: "update"; payload: { token: string; user: Usuario , email:string, password:string} }
  | { type: "addError"; payload: string }
  | { type: "addErrorUpdate"; payload: { error: string,token: string; user: Usuario , email:string, password:string} }
  | { type: "removeError" }
  | { type: "notAuthenticated" }
  | { type: "logout" }
  | { type: "resetPassword" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        user: null,
        status: "not-authenticated",
        token: null,
        errorMessage: action.payload,
      };
    case "addErrorUpdate":
        return {
            ...state,
            errorMessage: action.payload.error,
            status: "authenticated",
            token: action.payload.token,
            user: action.payload.user,
            
    
    };

    case "removeError":
      return {
        ...state,
        errorMessage: "",
      };

    case "signUp":
      return {
        ...state,
        errorMessage: "",
        status: "authenticated",
        token: action.payload.token,
        user: action.payload.user,
      };
      case "signUp":
      return {
        ...state,
        errorMessage: "",
        status: "authenticated",
        token: action.payload.token,
        user: action.payload.user,
      };

    case "update":
      return {
        ...state,
        errorMessage: "",
        status: "authenticated",
        token: action.payload.token,
        user: action.payload.user,
        

      };
      
    // case 'resetPassword':
    //     return {
    //         ...state,
    //         status: 'not-authenticated', // Cambia el estado a no autenticado para redirigir a la pantalla de inicio de sesión
    //         token: null,
    //         user: null,
    //     };

    case "logout":
      return {
        ...state,
        status: "not-authenticated",
        token: null,
        user: null,
      };
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
