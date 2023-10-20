import React, { useContext, useEffect } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm } from "../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  const { email, password, onChange } = useForm({
    email: "",
    password: "",
  });

  const onLogin = () => {
    Keyboard.dismiss();
    
    signIn({ email, password });
  };
  useEffect(() => {
    if (errorMessage.length === 0) return;
    
    Alert.alert("Error", errorMessage, [
      {
        text: "ok",
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Bienvenido!</Text>
          <Text style={loginStyles.subtitle}>Ingrese credenciales</Text>

          <TextInput
            placeholder="Email"
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
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            placeholder="Contraseña"
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
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={loginStyles.resetButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace("ResetPasswordScreen")}
              style={loginStyles.resetButton}
            >
              <Text style={loginStyles.resetButtonText}>Recuperar cuenta</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.newUserContainer}>
            <Text style={loginStyles.createAccountText}>
              Quieres crear una nueva cuenta?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace("RegisterScreen")}
            >
              <Text style={loginStyles.signUpButtonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
