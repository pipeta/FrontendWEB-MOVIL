import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TeamsStackParams, Task } from "../navigator/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { Background } from "../components/Background";
import { RouteProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

interface Props extends StackScreenProps<TeamsStackParams, "TaskDetailScreen"> {
  route: RouteProp<TeamsStackParams, "TaskDetailScreen">;
}

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const task: Task = route.params;

  const handleEditPress = () => {
   
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
      <View style={styles.container}>
        <Text style={styles.title}>Task Details</Text>

      
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Name:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.name}</Text>
            <TouchableOpacity onPress={handleEditPress}>
              <FontAwesome name="edit" size={20} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>

      
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Description:</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{task.description}</Text>
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default TaskDetailScreen;
