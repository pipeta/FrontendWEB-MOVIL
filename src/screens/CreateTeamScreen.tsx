import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamContext } from "../context/TeamContext";

import { useForm } from "../hooks/useForm";
import { LoadingScreen } from "./LoadingScreen";

export const CreateTeamScreen = () => {
  const { createTeam } = useContext(TeamContext);

  const { name, onChange, resetForm } = useForm({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const newProyect = async () => {
    Keyboard.dismiss();
    setIsButtonDisabled(true);
    setIsLoading(true);

    try {
      await createTeam(name);
      resetForm();
    } catch (error) {
      // Manejar errores si es necesario
      Alert.alert("Error", "Hubo un error al crear el equipo");
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Crear Equipo</Text>

          <TextInput
            placeholder="Nombre del equipo"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === "ios" && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            onSubmitEditing={newProyect}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                loginStyles.button,
                // isButtonDisabled && loginStyles.disabledButton,
              ]}
              onPress={newProyect}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <Text style={loginStyles.buttonText}>Crear</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
