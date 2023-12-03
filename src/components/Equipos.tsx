import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation
import { TeamContext } from "../context/TeamContext";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProyectContext } from "../context/ProyectContext";
// import { TeamsStackParams } from "../navigator/TeamsNavigator";
const windowWidth = Dimensions.get("window").width;

interface TeamData {
  _id: string;
  name: string;
  autor: string;
  uniqueCode: string;
  listUser: {
    userName: string;
    email: string;
    _id: string;
  }[];
}

export const Equipos = ({ proyectId }: { proyectId: string }) => {
  const { getTeamsByProyect } = useContext(ProyectContext);
  const [teams, setTeams] = useState<TeamData[]>([]);

  const fetchData = async () => {
    try {
      const data: TeamData[] = await getTeamsByProyect(proyectId);
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
    }, [proyectId])
  );

  const handleTeamPress = (selectedTeam: TeamData) => {
    // navigation.navigate('EditTestScreen', {
    //   id: selectedTeam._id,
    //   name: selectedTeam.name,
    //   autor: selectedTeam.autor,
    //   uniqueCode: selectedTeam.uniqueCode,
    // });
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        {teams.length > 0 ? (
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
          <Text style={styles.noTeamsText}>No hay equipos disponibles.</Text>
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
});
