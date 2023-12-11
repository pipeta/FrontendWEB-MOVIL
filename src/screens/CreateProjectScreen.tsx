import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { loginStyles } from "../theme/loginTheme";
import { Background } from "../components/Background";
import { LoadingScreen } from "../screens/LoadingScreen";
import { ProyectContext } from "../context/ProyectContext";
import { useForm } from "../hooks/useForm";

export const CreateProjectScreen = () => {
  const { createProyect } = useContext(ProyectContext);
  const { name, description, onChange, resetForm } = useForm({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const newProyect = async () => {
    try {
      setIsLoading(true);
      await createProyect({ name, description });
      setSuccessModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Error creating project:", error);
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSuccessModalVisible(false);
    setErrorModalVisible(false);
  };

  return (
    <>
      <Background />
      <View style={styles.container}>
        <Text style={[loginStyles.title, styles.title]}>Crear Proyecto</Text>

        {!isLoading && (
          <>
            <Text style={[loginStyles.label, styles.label]}>Nombre del Proyecto:</Text>
            <TextInput
              placeholder="Ingrese el nombre"
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={[loginStyles.inputField, styles.inputField]}
              selectionColor="white"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "name")}
              value={name}
              onSubmitEditing={newProyect}
            />

            <Text style={[loginStyles.label, styles.label]}>Descripción:</Text>
            <TextInput
              placeholder="Ingrese la descripción"
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={[loginStyles.inputField, styles.inputField]}
              selectionColor="black"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "description")}
              value={description}
              onSubmitEditing={newProyect}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                loginStyles.button,
                styles.button,
                {
                  marginTop: 20,
                  backgroundColor: name.trim() && description.trim() ? "#007BFF" : "gray",
                },
              ]}
              onPress={newProyect}
              disabled={!name.trim() || !description.trim() || isLoading}
            >
              <Text style={[loginStyles.buttonText, styles.buttonText]}>
                {isLoading ? "Creando..." : "Crear Proyecto"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <LoadingScreen />
          </View>
        )}

        <Modal animationType="slide" transparent={true} visible={successModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Proyecto creado correctamente</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={errorModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>No se pudo crear el proyecto. Inténtalo de nuevo.</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
  },
  label: {
    color: "white",
  },
  inputField: {
    color: "black",
  },
  buttonText: {
    color: "white",
  },
  button: {},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CreateProjectScreen;
