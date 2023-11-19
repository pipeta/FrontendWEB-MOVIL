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

export const Equipos = () => {
  const { fetchTeams, removeTeam } = useContext(TeamContext);
  const [teams, setTeams] = useState<TeamData[]>([]);

  const fetchData = async () => {
    try {
      const data: TeamData[] = await fetchTeams();
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

  const handleTeamPress = (selectedTeam: TeamData) => {
    // navigation.navigate('EditTestScreen', {
    //   id: selectedTeam._id,
    //   name: selectedTeam.name,
    //   autor: selectedTeam.autor,
    //   uniqueCode: selectedTeam.uniqueCode,
    // });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {teams.map((team, index) => (
          <TouchableOpacity
            key={team._id}
            activeOpacity={0.9}
            style={styles.column}
            onPress={() => handleTeamPress(team)} // Pass the selected team to the function
          >
            <View
              style={{
                ...styles.cardContainer,
                backgroundColor: "#474747",
              }}
            >
              <View>
                <Text style={styles.title}>{team.name}</Text>
                <Text style={styles.name}>Autor: {team.autor}</Text>
                <Text style={styles.name}>Código: {team.uniqueCode}</Text>

                <Text style={styles.name}>Usuarios: {team.listUser.length}</Text>
                {/* {team.listUser.map((user, userIndex) => (
                  <Text key={user._id} style={styles.name}>
                    - {user.userName} ({user.email})
                  </Text>
                ))}
                 */}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    top: 20,
    left: 10,
    color: "white",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    top: 20,
    left: 10,
    color: "white",
  },
  column: {
    width: "50%", // Dos columnas
  },
});
