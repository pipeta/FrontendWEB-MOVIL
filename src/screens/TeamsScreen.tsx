import React, { useContext, useState } from "react";
import { TeamContext } from "../context/TeamContext";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { PricingCard } from "@rneui/themed";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Team } from "../interfaces/teamInterfaces";
import { Background } from "../components/Background";
import { TeamsStackParams } from "../navigator/navigatorTypes";

interface Props extends StackScreenProps<TeamsStackParams, "EditTeamsScreen"> {
  route: RouteProp<TeamsStackParams, "EditTeamsScreen">;
}

export const TeamsScreen = () => {
  const { fetchTeams, removeTeam } = useContext(TeamContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation<StackScreenProps<TeamsStackParams, "EditTeamsScreen">["navigation"]>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: Team[] = await fetchTeams();
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
    }, [fetchTeams])
  );

  const handleRemoveTeam = async (uniqueCode: string) => {
    try {
      setIsButtonLoading(true);
      await removeTeam(uniqueCode);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleEditTeam = async (team: Team) => {
    navigation.navigate("EditTeamsScreen", {
      _id: team._id,
      name: team.name,
      autor: team.autor,
      uniqueCode: team.uniqueCode,
    });
  };

  return (
    <>
      <Background />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : teams.length === 0 ? (
          <Text style={styles.message}>No hay equipos disponibles</Text>
        ) : (
          <FlatList
            data={teams}
            keyExtractor={(team) => team._id}
            renderItem={({ item: team }) => (
              <PricingCard
                color={"white"}
                containerStyle={styles.cardContainer}
                price={team.name}
                pricingStyle={{ color: "white" }}
                title={`Autor: ${team.autor}`}
                info={[`Código Único: ${team.uniqueCode}`]}
                infoStyle={{ color: "white" }}
                button={
                  <View style={styles.buttonContainer}>
                    <Button
                      color="#5566ff"
                      title={isButtonLoading ? "Cargando..." : "Editar Equipo"}
                      onPress={() => handleEditTeam(team)}
                      disabled={isButtonLoading}
                    />
                    <Button
                      color="red"
                      title={isButtonLoading ? "Cargando..." : "Eliminar Equipo"}
                      onPress={() => handleRemoveTeam(team.uniqueCode)}
                      disabled={isButtonLoading}
                    />
                  </View>
                }
              />
            )}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: "#474747",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    elevation: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    color: "#ad1457",
    borderRadius: 10,
  },
});

export default TeamsScreen;
