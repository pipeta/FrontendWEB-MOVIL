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
import { ProyectContext } from "../context/ProyectContext";


export const CreateProjectScreen = () => {
  const { createProyect } = useContext(ProyectContext);

  const { name, description, onChange,resetForm } = useForm({
    name: "",
    description: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState();


  const newProyect = () => {
    Keyboard.dismiss();
    createProyect({name: name, description: description});
    resetForm()

  };

  


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
            placeholder="Nombre del proyecto"
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
            onSubmitEditing={newProyect}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={newProyect}
            >
              <Text style={loginStyles.buttonText}>Crear</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
