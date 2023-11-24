import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
} from "react-native";
import { Divider, PricingCard, lightColors } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProyectContext } from "../context/ProyectContext";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TeamContext } from "../context/TeamContext";
import { Team } from "../interfaces/teamInterfaces";



interface Props extends StackScreenProps<TeamsStackParams, "AddTeamsScreen"> {}

export const AddTeamsScreen = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const { fetchTeamsFree, removeTeam } = useContext(TeamContext);
  const { addTeamToProyect } = useContext(ProyectContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const { _id } = route.params;

  const fetchData = async () => {
    try {
      const data: Team[] = await fetchTeamsFree(_id);
      setTeams(data);
      console.log(data);
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
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          color="#ad1457"
        />
        <Divider />
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
      </View>
    </ImageBackground>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    color: "#ad1457",
    borderRadius: 10,
  },
});

export default AddTeamsScreen;
