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
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { LoadingScreen } from "../screens/LoadingScreen";
import { ProyectContext } from "../context/ProyectContext";

interface Props extends StackScreenProps<TeamsStackParams, "UpdateProyectScreen"> {
  route: RouteProp<TeamsStackParams, "UpdateProyectScreen">;
}

export const UpdateProyectScreen = ({ route, navigation }: Props) => {
  const { updateProyect } = useContext(ProyectContext);
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

  const { name, description, onChange, resetForm } = useForm({
    name:"",
    description: "",
  });

  const updateProject = async () => {
    try {
      setLoading(true);

      const updatedData = {
        name,
        description,
      };

      await updateProyect(route.params._id, updatedData);

      showSuccessModal();
      resetForm();
    } catch (error) {
      console.error("Error actualizando el proyecto:", error);
      showErrorModal("Error actualizando el proyecto. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptButtonPress = () => {
    closeModal();
    navigation.goBack();
    navigation.goBack();
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
          <Text style={loginStyles.title}>Actualizar Proyecto</Text>

          <TextInput
            style={loginStyles.inputField}
            placeholder="Nombre del Proyecto"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TextInput
            style={loginStyles.inputField}
            placeholder="Descripción"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, "description")}
            value={description}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <LoadingScreen />
            </View>
          ) : (
            <View style={loginStyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.button}
                onPress={updateProject}
                disabled={loading || !name.trim() || !description.trim()}
              >
                <Text style={loginStyles.buttonText}>Actualizar</Text>
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
              {errorModalVisible
                ? errorMessage
                : "¡Proyecto actualizado correctamente!"}
            </Text>
            {successModalVisible && (
              <TouchableHighlight
                style={styles.modalButton}
                onPress={handleAcceptButtonPress}
              >
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableHighlight>
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

