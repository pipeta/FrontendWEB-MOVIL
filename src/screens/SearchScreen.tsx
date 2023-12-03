import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Task, TasksContext, TaskState } from "../context/TaskContext";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";
import { Tasks } from "../components/Tasks";
import { Background } from "../components/Background";

interface Props extends StackScreenProps<TeamsStackParams, "SearchScreen"> {
  route: RouteProp<TeamsStackParams, "SearchScreen">;
}

export const SearchScreen = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const _id = route.params?._id;
  const { fetchTasks } = useContext(TasksContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const data: Task[] = await fetchTasks(_id);

      
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

  return (
    <>
      <Background />
      <View style={{ paddingTop: top, paddingHorizontal: 16 }}>
        <Tasks _id={_id} />
      </View>
    </>
  );
};
