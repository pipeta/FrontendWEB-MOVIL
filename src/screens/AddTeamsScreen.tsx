import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Divider, PricingCard, lightColors } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProyectContext } from "../context/ProyectContext";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TeamContext } from "../context/TeamContext";
import { Team } from "../interfaces/teamInterfaces";
import { Background } from "../components/Background";
import { FontAwesome } from "@expo/vector-icons";

interface Props extends StackScreenProps<TeamsStackParams, "AddTeamsScreen"> {}

export const AddTeamsScreen = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const { fetchTeamsFree, removeTeam } = useContext(TeamContext);
  const { addTeamToProyect } = useContext(ProyectContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { _id } = route.params;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: Team[] = await fetchTeamsFree(_id);
      setTeams(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        setTeams([]);
      };
    }, [])
  );

  const handleAddTeam = async (uniqueCode: string) => {
    try {
      console.log(typeof _id, typeof uniqueCode);
      console.log(_id, uniqueCode);
      await addTeamToProyect({
        uniqueCode,
        id_proyect: _id,
      });

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Background />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Divider />
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator style={styles.loadingIndicator} size="large" color="white" />
          ) : teams.length === 0 ? (
            <Text style={styles.heading}>No hay equipos para añadir</Text>
          ) : (
            <FlatList
              data={teams}
              keyExtractor={(team) => team._id}
              renderItem={({ item: team }) => (
                <PricingCard
                  color={"white"}
                  containerStyle={{
                    backgroundColor: "#474747",
                    borderRadius: 10,
                    borderWidth: 0,
                    borderColor: "transparent",
                    marginBottom: 10, // Espacio entre los equipos
                  }}
                  price={team.name}
                  pricingStyle={{ color: "white" }}
                  title={`Autor: ${team.autor}`}
                  info={[`Código Único: ${team.uniqueCode}`, "Usuarios:"]}
                  infoStyle={{ color: "white" }}
                  button={
                    <View style={styles.buttonContainer}>
                      <Button
                        color="green"
                        title="Asignar Equipo"
                        onPress={() => handleAddTeam(team.uniqueCode)}
                      />
                    </View>
                  }
                />
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  content: {
    flex: 1,
    marginTop: 40, // Espacio para la flecha de retroceso
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    color: "#ad1457",
    borderRadius: 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTeamsScreen;
