import React, { useContext, useState } from "react";
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
import { TaskState, TasksContext } from "../context/TaskContext";
import { useNavigation } from "@react-navigation/native";

interface UpdateTaskProps {}

export const UpdateTask: React.FC<UpdateTaskProps> = () => {
  const { deleteTask, updateTask } = useContext(TasksContext);
  const {
    taskId,
    name,
    description,
    responsible: id_responsible,
    startDate,
    endDate,
    project,
    onChange,
    resetForm,
  } = useForm({
    taskId: "",
    name: "",
    description: "",
    responsible: "",
    startDate: "",
    endDate: "",
    project: "",
  });
  const { navigate } = useNavigation();
  const [confirmationInfo, setConfirmationInfo] = useState({
    isVisible: false,
    action: "eliminar" as "eliminar" | "actualizar",
  });

  const setConfirmationVisibility = (
    isVisible: boolean,
    action: "eliminar" | "actualizar" = "eliminar"
  ) => {
    setConfirmationInfo({
      isVisible,
      action,
    });
  };

  const updateConfirmation = () => {
    if (!taskId.trim() ) {
      console.log("Ingrese el ID de la tarea y el nombre antes de actualizar.");
      return;
    }
    if (!name.trim()) {
      console.log("Ingrese el nombre de la tarea antes de actualizar.");
      return;
    }

    console.log("Antes de mostrar la alerta");
    const startDateParse = new Date(startDate)
    const endDateParse = new Date(endDate)

    updateTask(taskId, {
      name,
      description,
      nameResponsible: id_responsible,
      startDate: startDateParse,
      endDate: endDateParse,
    });
    resetForm();
    console.log("Después de resetForm:", taskId, name, description, id_responsible, startDate, endDate, project);
  };

  const deleteConfirmation = () => {
    console.log("taskID", taskId);
    console.log("Ingresando a deleteConfirmation");
    if (!taskId.trim()) {
      console.log("Ingrese el ID de la tarea antes de intentar eliminar.");
      return;
    }
    console.log("Antes de mostrar la alerta");
    deleteTask(taskId);
    resetForm();
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
              value={id_responsible}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View>
            <TextInput
              style={loginStyles.inputField}
              placeholder="YYYY/MM/DD"
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
              placeholder="YYYY/MM/DD"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "endDate")}
              value={endDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => setConfirmationVisibility(true, "actualizar")}
            >
              <Text style={styles.buttonText}>Actualizar Tarea</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.button, backgroundColor: "red" }}
              onPress={() => setConfirmationVisibility(true, "eliminar")}
            >
              <Text style={styles.buttonText}>Eliminar Tarea</Text>
            </TouchableOpacity>
          </View>

          {confirmationInfo.isVisible && (
            <View style={loginStyles.confirmationContainer}>
              <Text style={loginStyles.confirmationText}>
                {confirmationInfo.action === "actualizar"
                  ? "¿Estás seguro de que quieres actualizar esta tarea?"
                  : "¿Estás seguro de que quieres eliminar esta tarea?"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  loginStyles.confirmationButton,
                  { backgroundColor: "red" },
                ]}
                onPress={() => setConfirmationVisibility(false)}
              >
                <Text style={loginStyles.confirmationButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  loginStyles.confirmationButton,
                  { backgroundColor: "green" },
                ]}
                onPress={
                  confirmationInfo.action === "actualizar"
                    ? updateConfirmation
                    : deleteConfirmation
                }
              >
                <Text style={loginStyles.confirmationButtonText}>
                  {confirmationInfo.action === "actualizar"
                    ? "Actualizar"
                    : "Eliminar"}
                </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
