import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TasksContext, Task, TaskState } from "../context/TaskContext";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";

const windowWidth = Dimensions.get("window").width;

export const Tasks = ({ _id }: { _id: string }) => {
  const { top } = useSafeAreaInsets();
  const { fetchTasks } = useContext(TasksContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const data: Task[] = await fetchTasks(_id);

      // Formatear las fechas utilizando moment
      const formattedTasks = data.map((task) => ({
        ...task,
        startDate: new Date(task.startDate),
        endDate: new Date(task.endDate),
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        setTasks([]);
      };
    }, [_id])
  );

  const handleTaskPress = (selectedTask: Task) => {
    // Puedes agregar la navegación aquí si es necesario
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TouchableOpacity
              key={task.id_proyect}
              activeOpacity={0.9}
              style={styles.column}
              onPress={() => handleTaskPress(task)}
            >
              <View style={{ ...styles.cardContainer, backgroundColor: "#474747" }}>
                <View>
                  <Text style={styles.title}>{task.name}</Text>
                  <Text style={styles.subtitle}>{task.nameResponsible}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTasksText}>No hay tareas disponibles.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 10,
  },
  cardContainer: {
    marginVertical: 10,
    height: 120,
    width: windowWidth * 0.4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#474747",  // Cambiado a #474747
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  column: {
    width: "50%",
  },
  noTasksText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
