import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  ResetPasswordData,
  Update,
  UpdateResponse,
  Usuario,
} from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./AuthReducer";
import API from "../api/nestApi";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: (RegisterData: RegisterData) => void;
  signIn: (LoginData: LoginData) => void;
  update: (update: Update) => void;
  logOut: () => void;
  removeError: () => void;
  resetPassword: (ResetPasswordData: ResetPasswordData) => void;
};

const AuthInicialState: AuthState = {
  status: "checking",
  token: null,
  user: null,
  errorMessage: "",
};
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, AuthInicialState);

  useEffect(() => {
    validarToken();
  }, []);

  const validarToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const resp = JSON.parse((await AsyncStorage.getItem("user")) ?? "{}");

    if (!token) return dispatch({ type: "notAuthenticated" });
  };

  const update = async ({ email, password, userName }: Update) => {
    try {
      const token2 = await AsyncStorage.getItem("token");

      if (token2 !== null) {
        const resp = await API.put<UpdateResponse>(
          "/user/update",
          {
            email,
            password,
            userName,
          },
          {
            headers: {
              Authorization: `Bearer ${token2}`,
            },
          }
        );

        const userEmail = email ? email : "";
        const userPassword = password ? password : "";

        dispatch({
          type: "update",
          payload: {
            token: token2,
            user: { userName: resp.data.userName, email: resp.data.email },
            email: userEmail,
            password: userPassword,
          },
        });
        await AsyncStorage.setItem("token", token2);
        await AsyncStorage.setItem("user", JSON.stringify(resp.data.userName));
      } else {
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);

        dispatch({
          type: "addError",
          payload: error.response?.data.message || "Informacion incorrecta",
        });
      }
    }
  };

  const signUp = async ({ email, password, userName }: RegisterData) => {
    try {
      const resp = await API.post<RegisterResponse>("/auth/register", {
        email,
        password,
        userName,
      });

      console.log("SignUp Response:", resp.data);
      dispatch({
        type: "signUp",
        payload: {
          token: resp.data.access_token,
          user: { userName: resp.data.userName, email: resp.data.email },
        },
      });

      await AsyncStorage.setItem("token", resp.data.access_token);
      await AsyncStorage.setItem("user", JSON.stringify(resp.data.userName));
      console.log(signUp);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        dispatch({
          type: "addError",
          payload: error.response?.data.message || "Informacion incorrecta",
        });
      }
    }
  };
  const signIn = async ({ email, password }: LoginData) => {
    try {
      const resp = await API.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      console.log("SignIn Response:", resp.data);
      dispatch({
        type: "signUp",
        payload: {
          token: resp.data.access_token,
          user: { userName: resp.data.userName, email: resp.data.email },
        },
      });
      await AsyncStorage.setItem("token", resp.data.access_token);
      await AsyncStorage.setItem("user", JSON.stringify(email));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        dispatch({
          type: "addError",
          payload: error.response?.data.message || "Informacion incorrecta",
        });
      }
    }
  };
  const resetPassword = async ({ email }: ResetPasswordData) => {
    try {
      const resp = await API.post<LoginResponse>("/auth/recovery", { email });
      console.log(resp.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        dispatch({
          type: "addError",
          payload: error.response?.data.message || "Informacion incorrecta",
        });
      }
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    dispatch({ type: "logout" });
  };
  const removeError = () => {
    dispatch({
      type: "removeError",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        update,
        signIn,
        logOut,
        removeError,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
