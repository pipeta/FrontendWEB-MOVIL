import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { TeamsStackParams, Task } from "../navigator/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { Background } from "../components/Background";
import { RouteProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { TasksContext } from "../context/TaskContext";


interface Props extends StackScreenProps<TeamsStackParams, "TaskDetailScreen"> {
  route: RouteProp<TeamsStackParams, "TaskDetailScreen">;
}

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const task: Task = route.params;
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(
    task.description
  );

  const { updateTask, deleteTask } = useContext(TasksContext);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleDeletePress = () => {
    setDeleteModalVisible(true);
  };

  const handleSavePress = async () => {
    await updateTask(task.id_proyect, {
      name: editedName,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const handleDeleteTask = async () => {
    setDeleteModalVisible(false);
    await deleteTask(task.id_proyect);
    navigation.goBack();
  };

  return (
    <>
     <Background></Background>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeletePress}
        style={styles.deleteButton}
      >
        <FontAwesome name="trash-o" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Task Details</Text>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Name:</Text>
          <View style={styles.infoContainer}>
            {isEditing ? (
              <TextInput
                style={styles.editableValue}
                value={editedName}
                onChangeText={setEditedName}
              />
            ) : (
              <Text style={styles.value}>{task.name}</Text>
            )}
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Description:</Text>
          <View style={styles.infoContainer}>
            {isEditing ? (
              <TextInput
                style={styles.editableValue}
                value={editedDescription}
                onChangeText={setEditedDescription}
              />
            ) : (
              <Text style={styles.value}>{task.description}</Text>
            )}
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

      
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Start Date:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.startDate.toString()}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={styles.detailContainer}>
          <Text style={styles.label}>End Date:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.endDate.toString()}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

   
        <View style={styles.detailContainer}>
          <Text style={styles.label}>State:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.state}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Creator Email:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.emailCreator}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Responsible Name:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.nameResponsible}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>


        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        )}

        <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Seguro que quieres eliminar esta tarea?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                 style={styles.modalButton}
                 onPress={handleDeleteTask}
              >
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  detailContainer: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
    width: "100%",
  },
  value: {
    fontSize: 16,
    color: "white",
  },
  editableValue: {
    fontSize: 16,
    color: "black",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 5,
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
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


export default TaskDetailScreen;
