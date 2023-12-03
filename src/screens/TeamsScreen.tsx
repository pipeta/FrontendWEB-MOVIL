import React, { useContext, useState } from "react";
import { TeamContext } from "../context/TeamContext";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { PricingCard, lightColors } from "@rneui/themed";
import { Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Team } from "../interfaces/teamInterfaces";
import { Background } from "../components/Background";

interface Props extends StackScreenProps<any, any> {}

export const TeamsScreen = ({ navigation }: Props) => {
  const { fetchTeams, removeTeam } = useContext(TeamContext);
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchData = async () => {
    try {
      const data: Team[] = await fetchTeams();
      setTeams(data);
    } catch (error) {
      console.error(error);
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
    await removeTeam(uniqueCode);
    fetchData();
  };

  const handleEditTeam = async (uniqueCode: string, _id: string) => {
    navigation.navigate("EditTeamsScreen", {
      uniqueCode: uniqueCode,
      _id: _id,
    });
  };

  return (
    <>
      <Background />
      <View style={styles.container}>
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
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 20,
                },
                shadowOpacity: 1, // Ajusta este valor según tu preferencia
                shadowRadius: 10, // Ajusta este valor según tu preferencia
                elevation: 10,
              }}
              price={team.name}
              pricingStyle={{ color: "white" }}
              title={`Autor: ${team.autor}`}
              info={[`Código Único: ${team.uniqueCode}`]}
              infoStyle={{ color: "white" }}
              button={
                <View style={styles.buttonContainer}>
                  <Button
                    color="#5566ff"
          
                    title="Editar Equipo"
                    onPress={() => handleEditTeam(team.uniqueCode, team._id)}
                  />
                  <Button
                    color="red"
                    title="Eliminar Equipo"
                    onPress={() => handleRemoveTeam(team.uniqueCode)}
                  />
                </View>
              }
            />
          )}
        />
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
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
