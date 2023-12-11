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
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { Background } from "../components/Background";
import { LoadingScreen } from "../screens/LoadingScreen";

export const SettingsScreen = () => {
  const { user, update } = useContext(AuthContext);
  const { email, password, userName, onChange } = useForm({
    email: user?.email || "",
    password: "",
    userName: user?.userName || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSaveChanges = async () => {
    if (!password.trim()) {
      setErrorModalVisible(true);
      return;
    }

    try {
      setIsButtonDisabled(true);
      setIsLoading(true);
      await update({
        email,
        password,
        userName,
      });
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
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
        <Text style={[loginStyles.title, styles.title]}>Editar Perfil</Text>

        {!isLoading && (
          <>
            <Text style={[loginStyles.label, styles.label]}>Nombre:</Text>
            <TextInput
              placeholder={user?.userName}
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={[loginStyles.inputField, styles.inputField]}
              selectionColor="white"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "userName")}
              value={userName}
              onSubmitEditing={onSaveChanges}
            />

            <Text style={[loginStyles.label, styles.label]}>Email:</Text>
            <TextInput
              placeholder={user?.email}
              placeholderTextColor="rgba(0,0,0,0.4)"
              keyboardType="email-address"
              style={[loginStyles.inputField, styles.inputField]}
              selectionColor="black"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "email")}
              value={email}
              onSubmitEditing={onSaveChanges}
            />

            <Text style={[loginStyles.label, styles.label]}>Contraseña:</Text>
            <TextInput
              placeholder="******"
              placeholderTextColor="rgba(0,0,0,0.4)"
              secureTextEntry
              style={[loginStyles.inputField, styles.inputField]}
              selectionColor="black"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "password")}
              value={password}
              onSubmitEditing={onSaveChanges}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                loginStyles.button,
                styles.button,
                {
                  marginTop: 20,
                  backgroundColor: password.trim() ? "#007BFF" : "gray",
                },
              ]}
              onPress={onSaveChanges}
              disabled={!password.trim() || isButtonDisabled}
            >
              <Text style={[loginStyles.buttonText, styles.buttonText]}>Editar</Text>
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
              <Text style={styles.modalText}>Perfil actualizado correctamente</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={errorModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>No se pudo actualizar el perfil. Inténtalo de nuevo.</Text>
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

export default SettingsScreen;
