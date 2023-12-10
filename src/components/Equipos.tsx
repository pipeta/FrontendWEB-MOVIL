import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { TeamContext } from "../context/TeamContext";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProyectContext } from "../context/ProyectContext";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { Team } from "../interfaces/teamInterfaces";
import { LoadingScreen } from "../screens/LoadingScreen";

const windowWidth = Dimensions.get("window").width;

type RouteParams = {
  EditTeamsScreen: {
    _id: string;
    name: string;
    autor: string;
    uniqueCode: string;
  };
};

interface Props extends StackScreenProps<TeamsStackParams, "EditTeamsScreen"> {
  route: RouteProp<TeamsStackParams, "EditTeamsScreen">;
  navigation: StackScreenProps<TeamsStackParams, "EditTeamsScreen">["navigation"];
}

export const Equipos = ({ proyectId }: { proyectId: string }) => {
  const { getTeamsByProyect } = useContext(ProyectContext);
  const { fetchMemberTeam } = useContext(TeamContext);
  const [teams, setTeams] = useState<Team[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<StackScreenProps<TeamsStackParams, "EditTeamsScreen">["navigation"]>();

  const { fetchTeams, removeTeam } = useContext(TeamContext);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: Team[] = await getTeamsByProyect(proyectId);
      setTeams(data);
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
    }, [proyectId])
  );

  const handleTeamPress = async (selectedTeam: Team) => {
    const data2: Team[] = await fetchTeams();

    // Buscar el equipo en data2 por el nombre
    const matchingTeam = data2.find((team) => team.name === selectedTeam.name);

    if (matchingTeam) {
      navigation.navigate("EditTeamsScreen", {
        _id: matchingTeam._id,
        name: matchingTeam.name,
        autor: matchingTeam.autor,
        uniqueCode: matchingTeam.uniqueCode,
      });
    } else {
      console.log("No se encontró el equipo en data2");
    }
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.centeredContainer}>
            <LoadingScreen />
          </View>
        ) : teams && teams.length > 0 ? (
          teams.map((team, index) => (
            <TouchableOpacity
              key={team._id}
              activeOpacity={0.9}
              style={styles.column}
              onPress={() => handleTeamPress(team)}
            >
              <View
                style={{
                  ...styles.cardContainer,
                  backgroundColor: "#171a1f",
                }}
              >
                <View>
                  <Text style={styles.title}>{team.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.centeredContainer}>
            <Text style={styles.noTeamsText}>No hay equipos disponibles.</Text>
          </View>
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
    backgroundColor: "#171a1f",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  column: {
    width: "50%",
  },
  noTeamsText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
