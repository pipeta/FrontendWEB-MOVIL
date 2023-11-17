import React, { useContext, useEffect } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { useForm } from "../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext);
  const { email, userName, password, onChange } = useForm({
    email: "",
    password: "",
    userName: "",
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert("Registro incorrecto", errorMessage, [
      {
        text: "Ok",
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    if (
      email.trim() === "" ||
      userName.trim() === "" ||
      password.trim() === ""
    ) {
      Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
      return;
    }

    console.log({ email, password, userName });
    Keyboard.dismiss();
    signUp({ email, password, userName });
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Registrar Usuario</Text>

          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su Nombre:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "userName")}
            value={userName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "email")}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={loginStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "password")}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace("LoginScreen")}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}
          >
            
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
