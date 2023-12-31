import React, { useContext, useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Task, TasksContext } from "../context/TaskContext";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Background } from "../components/Background";
import { Tasks } from "../components/Tasks";
import { AuthContext } from "../context/AuthContext";
import { FAB } from "@rneui/themed";
import { Divider } from "@rneui/base";

interface Props extends StackScreenProps<TeamsStackParams, "SearchScreen"> {
  route: RouteProp<TeamsStackParams, "SearchScreen">;
}

export const SearchScreen = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const teamId = route.params?._id;
  const { fetchTasks } = useContext(TasksContext);
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [showMyTasks, setShowMyTasks] = useState<boolean>(false);

  const handleFABPress = () => {
    navigation.navigate("CreateTask", { _id: teamId });
  };

  const fetchData = async () => {
    try {
      if (!user) {
        return;
      }

      let data: Task[] = await fetchTasks(teamId);

      const formattedTasks = data.map((task) => ({
        ...task,
        startDate: task.startDate,
        endDate: task.endDate,
      }));

      if (showMyTasks) {
        // Si "Solo Mis Tareas" está habilitado, filtramos por el creador de la tarea
        data = formattedTasks.filter((task) => task.emailCreator === user.email);
      }

      // Filtrar por nombre (searchText)
      data = data.filter((task) =>
        task.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setTasks(data);
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
    }, [teamId, user, showMyTasks])
  );

  // Manejar cambios en searchText
  useEffect(() => {
    fetchData();
  }, [searchText]);

  return (
    <>
      <Background />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <View style={{ paddingTop: top, paddingHorizontal: 30 }}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Buscar por nombre de tarea</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Escribe aquí"
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: showMyTasks ? "gray" : "rgba(255, 255, 255, 0.2)" },
            ]}
            onPress={() => setShowMyTasks(!showMyTasks)}
          >
            <Text style={styles.filterButtonText}>
              {showMyTasks ? "Mostrar Todas las Tareas" : "Solo Mis Tareas"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Tasks route={route} navigation={navigation} tasks={tasks} />
      </View>
      <Divider></Divider>
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        color="green"
        title={"+"}
        size="large"
        onPress={handleFABPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    height: 600,
    marginBottom: 50,
    marginTop: 50,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  inputField: {
    color: "white",
    fontSize: 24,
    borderWidth: 0,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  filterButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
});
