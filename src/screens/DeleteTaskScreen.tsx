import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { useForm } from "../hooks/useForm";

interface DeleteTaskScreenProps {}

export const DeleteTaskScreen: React.FC<DeleteTaskScreenProps> = () => {
  const { taskId, onChange } = useForm({
    taskId: "",
  });

  const [isConfirmationVisible, setConfirmationVisibility] = useState(false);

  const deleteConfirmation = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
           
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Eliminar tarea</Text>

          
          <View>
           
            <TextInput
              style={loginStyles.inputField}
              placeholder="Ingrese el ID de la tarea"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "taskId")}
              value={taskId}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => setConfirmationVisibility(true)}
            >
              <Text style={styles.buttonText}>Eliminar Tarea</Text>
            </TouchableOpacity>
          </View>

          
          {isConfirmationVisible && (
            <View style={loginStyles.confirmationContainer}>
              <Text style={loginStyles.confirmationText}>
                ¿Estás seguro de que quieres eliminar esta tarea?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[loginStyles.confirmationButton, { backgroundColor: "red" }]}
                onPress={() => setConfirmationVisibility(false)}
              >
                <Text style={loginStyles.confirmationButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[loginStyles.confirmationButton, { backgroundColor: "green" }]}
                onPress={deleteConfirmation}
              >
                <Text style={loginStyles.confirmationButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF3B30", 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
