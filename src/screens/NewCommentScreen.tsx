import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { FontAwesome } from "@expo/vector-icons";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { CommentContext } from "../context/CommentContext";
import { LoadingScreen } from "./LoadingScreen";

interface Props extends StackScreenProps<TeamsStackParams, "NewCommentScreen"> {
  route: RouteProp<TeamsStackParams, "NewCommentScreen">;
}
export interface Comment {
  _id: string;
  description: string;
  autorEmail: string;
  id_task: string;
}

const NewCommentScreen = ({ route, navigation }: Props) => {
  const { createComment, getComments } = useContext(CommentContext);
  const [commentText, setCommentText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEmptyModalVisible, setEmptyModalVisible] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const handleCreateComment = async () => {
    if (!commentText.trim() || isLoading) {
      if (!commentText.trim()) {
        setEmptyModalVisible(true);
      }
      return;
    }

    try {
      setLoading(true);

      await createComment({
        description: commentText,
        id_task: route.params._id,
      });

      setCommentText("");
      setModalVisible(true);
    } catch (error) {
      console.error("Error creando comentario:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    navigation.navigate("TaskCommentScreen", {
      _id: route.params._id,
      description: route.params.description,
      emailCreator: route.params.emailCreator,
      endDate: route.params.endDate,
      id_proyect: route.params.id_proyect,
      is_deleted: route.params.is_deleted,
      name: route.params.name,
      nameResponsible: route.params.nameResponsible,
      startDate: route.params.startDate,
      state: route.params.state,
    });
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
        <View style={styles.container}>
          <Text style={styles.title}>Agregar Comentario</Text>

          <View>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su comentario..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => setCommentText(value)}
              value={commentText}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={handleCreateComment}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <Text style={styles.buttonText}>Agregar Comentario</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Comentario creado exitosamente!
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEmptyModalVisible}
        onRequestClose={() => setEmptyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              El comentario no puede estar vacío.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEmptyModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  input: {
    color: "gray",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
    height: 120,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#5566ff",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
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
    backgroundColor: "#4CAF50", // Cambiado a verde
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NewCommentScreen;
