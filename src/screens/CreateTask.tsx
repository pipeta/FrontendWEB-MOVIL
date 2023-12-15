import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { useForm } from "../hooks/useForm";
import { FontAwesome } from "@expo/vector-icons";
import { TasksContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

enum TaskState {
  TODO = "to_do",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

interface Props extends StackScreenProps<TeamsStackParams, "CreateTask"> {
  route: RouteProp<TeamsStackParams, "CreateTask">;
}

export const CreateTask = ({ route, navigation }: Props) => {
  const { createTask } = useContext(TasksContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const showSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const closeModal = () => {
    setErrorModalVisible(false);
    setSuccessModalVisible(false);
  };

  const { name, description, startDate, endDate, onChange } = useForm({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const newTask = async () => {
    try {
      setLoading(true);
      console.log(route.params._id);
      // Date format validation
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!startDate.match(dateRegex) || !endDate.match(dateRegex)) {
        showErrorModal(
          "Invalid date format. Please use YYYY-MM-DD format for dates."
        );
        return;
      }
      if (!name.trim()) {
        showErrorModal("Name is required.");
        return;
      }

      if (!description.trim()) {
        showErrorModal("Description is required.");
        return;
      }

      if (/\d/.test(name) || /\d/.test(description)) {
        showErrorModal("Name and description cannot contain numbers.");
        return;
      }
      const taskData = {
        name,
        description,
        startDate: startDate ? startDate : null,
        endDate: endDate ? endDate : null,
        state: TaskState.TODO,
        emailCreator: user?.email || "",
        nameResponsible: null,
        id_proyect: route.params._id,
        is_deleted: false,
      };
      console.log(taskData)
      await createTask(taskData);

      showSuccessModal();
      navigation.goBack();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      showErrorModal("Error creating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Crear tarea</Text>

          <TextInput
            style={loginStyles.inputField}
            placeholder="Nombre de la tarea"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={loginStyles.inputField}
            placeholder="Descripción de la tarea"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, "description")}
            value={description}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={loginStyles.inputField}
            placeholder="Fecha de inicio"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, "startDate")}
            value={startDate}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={loginStyles.inputField}
            placeholder="Fecha de fin"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, "endDate")}
            value={endDate}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={loginStyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.button}
                onPress={newTask}
                disabled={loading}
              >
                <Text style={loginStyles.buttonText}>Crear</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible || successModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {errorModalVisible ? errorMessage : "Task created successfully!"}
            </Text>
            <TouchableHighlight style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
});
