import React, { useContext, useEffect, useState } from "react";
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


export const CreateProjectScreen = () => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  const { name, description, onChange } = useForm({
    name: "",
    description: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState();

  const onLogin = () => {
    Keyboard.dismiss();
    // signIn({ name, description });
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
          <Text style={loginStyles.title}>Crear proyecto</Text>
          

          <TextInput
            placeholder="Nombre de equipo"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            placeholder="Descripción"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "description")}
            value={description}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          

         

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Crear</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
