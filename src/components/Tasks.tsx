import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Task } from "../interfaces/task.interfaces";

const windowWidth = Dimensions.get("window").width;

interface Props {
  route?: RouteProp<TeamsStackParams, "SearchScreen">;  // Ajuste aquí
  navigation: StackScreenProps<TeamsStackParams, "SearchScreen">["navigation"];
  tasks: Task[];
}

export const Tasks: React.FC<Props> = ({ route, navigation, tasks }: Props) => {
  const handleTaskPress = async (task: Task) => {
    navigation.navigate("TaskDetailScreen", {
      _id: task._id,
      description: task.description,
      emailCreator: task.emailCreator,
      endDate: task.endDate,
      id_proyect: task.id_proyect,
      is_deleted: task.is_deleted,
      name: task.name,
      nameResponsible: task.nameResponsible,
      startDate: task.startDate,
      state: task.state,
    });
  };

  const keyExtractor = (task: Task) => task.id_proyect;

  return (
    <FlatList
      data={tasks}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={keyExtractor(item)}
          activeOpacity={0.9}
          style={styles.cardContainer}
          onPress={() => handleTaskPress(item)}
        >
          <View style={styles.taskInfoContainer}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.nameResponsible}</Text>
            </View>
            <FontAwesome name="eye" size={24} color="white" style={styles.eyeIcon} />
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    marginLeft: 10,
    width: "100%",
  },
  cardContainer: {
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#474747",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  taskInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "left",
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
