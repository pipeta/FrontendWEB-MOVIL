import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, StyleSheet } from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { useForm } from "../hooks/useForm";
import { ProyectContext } from "../context/ProyectContext";

interface UpdateTaskProps {}

export const UpdateTask: React.FC<UpdateTaskProps> = () => {
//   const { updateTask } = useContext(ProyectContext);

  const {
    taskId,
    name,
    description,
    responsible,
    startDate,
    endDate,
    project,
    onChange,
  } = useForm({
    taskId: "",
    name: "",
    description: "",
    responsible: "",
    startDate: "", 
    endDate: "", 
    project: "",
  });

  const [isConfirmationVisible, setConfirmationVisibility] = useState(false);

  const updateConfirmation = () => {
    Alert.alert(
      "Confirmar actualización",
      "¿Estás seguro de que quieres actualizar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Actualizar",
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
          <Text style={loginStyles.title}>Actualizar tarea</Text>

          
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

          
          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="Nombre de la tarea"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "name")}
              value={name}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          
          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="Descripción de la tarea"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "description")}
              value={description}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          
          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="Nombre del responsable"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "responsible")}
              value={responsible}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

         
          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "startDate")}
              value={startDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

         
          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "endDate")}
              value={endDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

        
          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="Nombre del proyecto"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "project")}
              value={project}
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
              <Text style={styles.buttonText}>Actualizar Tarea</Text>
            </TouchableOpacity>
          </View>

         
          {isConfirmationVisible && (
            <View style={loginStyles.confirmationContainer}>
              <Text style={loginStyles.confirmationText}>
                ¿Estás seguro de que quieres actualizar esta tarea?
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
                onPress={updateConfirmation}
              >
                <Text style={loginStyles.confirmationButtonText}>Actualizar</Text>
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
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
});