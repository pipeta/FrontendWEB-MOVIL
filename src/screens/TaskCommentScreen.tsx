import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider, FAB } from "@rneui/base";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import NewCommentForm from "../components/AddComment";
import CommentList from "../components/Comment";
import { CommentContext } from "../context/CommentContext";

interface Props extends StackScreenProps<TeamsStackParams, "TaskCommentScreen"> {
  route: RouteProp<TeamsStackParams, "TaskCommentScreen">;
}

export interface Comment {
  _id: string;
  description: string;
  autorEmail: string;
  id_task: string;
}

export const TaskCommentScreen = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const {
    _id,
    description,
    emailCreator,
    endDate,
    id_proyect,
    is_deleted,
    name,
    nameResponsible,
    startDate,
    state,
  } = route.params;
  const [isFABLoading, setIsFABLoading] = useState(false);
  const { getComments, deleteComment } = useContext(CommentContext);

  const handleNavigatePress = () => {
    navigation.navigate("TaskDetailScreen", {
      _id: _id,
      description: description,
      emailCreator: emailCreator,
      endDate: endDate,
      id_proyect: id_proyect,
      is_deleted: is_deleted,
      name: name,
      nameResponsible: nameResponsible,
      startDate: startDate,
      state: state,
    });
  };

  const handleFABPress = async () => {
    try {
      setIsFABLoading(true);
      await navigation.navigate("NewCommentScreen", {
        _id: _id,
        description: description,
        emailCreator: emailCreator,
        endDate: endDate,
        id_proyect: id_proyect,
        is_deleted: is_deleted,
        name: name,
        nameResponsible: nameResponsible,
        startDate: startDate,
        state: state,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFABLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFF0" }}>
      <View style={{ ...styles.headerContainer }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 15 }}
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Divider></Divider>

        <TouchableOpacity
          onPress={handleNavigatePress}
          style={{ ...styles.editButton, top: top + 15, right: 20 }}
        >
          <FontAwesome name="edit" size={30} color="white" />
        </TouchableOpacity>

        <View style={{ ...styles.infoContainer, marginTop: top + 70 }}>
          <Text style={styles.label}>{"Name:"}</Text>
          <Text style={styles.info}>{name || "Task Name"}</Text>
        </View>

        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <Text style={styles.subName}>{`Descripción: ${
            description || "Task Description"
          }`}</Text>
          <Text style={styles.subName}>{`Creador: ${
            emailCreator || "Task Creator"
          }`}</Text>
          <Text style={styles.subName}>{`Fecha de Inicio: ${
            startDate || "No disponible"
          }`}</Text>
          <Text style={styles.subName}>{`Fecha de Fin: ${
            endDate || "No disponible"
          }`}</Text>
          <Text style={styles.subName}>{`Estado: ${
            state || "No disponible"
          }`}</Text>
        </View>
      </View>

      <View style={{ flex: 1, marginBottom: 60 }}>
        <Text style={styles.Title}>{"Comentarios de Tarea"}</Text>
        <CommentList id_task={_id} />
      </View>

      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          elevation: 5,
        }}
        color="green"
        title={isFABLoading ? "Cargando..." : "+"}
        size="large"
        onPress={handleFABPress}
        disabled={isFABLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#171a1f",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  backButton: {
    flex: 1,
    position: "absolute",
    left: 20,
    alignItems: "flex-start",
  },
  editButton: {
    position: "absolute",
    top: 15,
    right: 20,
    zIndex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  Title: {
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default TaskCommentScreen;
