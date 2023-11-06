import React, { useContext, useState, useEffect } from "react";
import { TeamContext } from "../context/TeamContext";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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

export const TestingScreen = () => {
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

  const handleRemoveTeam = async (uniqueCode: string) => {
    await removeTeam(uniqueCode);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Equipos:</Text>
      <FlatList
        data={teams}
        keyExtractor={(team) => team._id}
        renderItem={({ item: team }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.teamName}>Nombre: {team.name}</Text>
              <Text>Autor: {team.autor}</Text>
              <Text>Código Único: {team.uniqueCode}</Text>
              <Text>Usuarios:</Text>
              <FlatList
                data={team.listUser}
                keyExtractor={(user) => user._id}
                renderItem={({ item: user }) => (
                  <Text key={user._id}>
                    {user.userName} - {user.email}
                  </Text>
                )}
              />
            </Card.Content>
            <Button
              title="Eliminar Equipo"
              onPress={() => handleRemoveTeam(team.uniqueCode)}
            />
          </Card>
        )}
      />
    </View>
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
  },
  card: {
    marginBottom: 16,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
