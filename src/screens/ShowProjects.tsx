import React, { useContext, useState } from "react";
import { TeamContext } from "../context/TeamContext";
import { View, FlatList, Text, StyleSheet, ImageBackground } from "react-native";
import { PricingCard, lightColors } from '@rneui/themed';
import { Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface TeamData {
  _id: string;
  name: string;
  autor: string;
  uniqueCode: string;
 
}

export const ShowProjects = () => {
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
  const handleEditTeam = async (uniqueCode: string) => {
    // await removeTeam(uniqueCode);
    // fetchData();
    console.log('hola')
  };

  return (
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* <Text style={styles.heading}>Lista de Equipos:</Text> */}
        <FlatList
          data={teams}
          keyExtractor={(team) => team._id}
          renderItem={({ item: team }) => (
            <PricingCard
              color={'white'}
              containerStyle={{ backgroundColor:  "#474747" ,  borderRadius: 10, borderWidth: 0, borderColor: 'transparent'}}
              price={team.name}
              pricingStyle={{color:'white'}}
              
              // title={`Autor: ${team.autor}`}
              info={[`Código Único: ${team.uniqueCode}`, 'Usuarios:']}
              infoStyle={{color:'white'}}
              button={
                <View style={styles.buttonContainer}>
                  <Button color='#ad1457' title="Editar Equipo" onPress={() => handleEditTeam(team.uniqueCode)} />
                  <Button color='#ad1457' title="Eliminar Equipo" onPress={() => handleRemoveTeam(team.uniqueCode)} />
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
    color: 'white',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
    color: '#ad1457',
    borderRadius:10


  }
});

export default ShowProjects;
