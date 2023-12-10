import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet, Text, Button, ActivityIndicator } from "react-native";
import { PricingCard } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { ProyectContext } from "../context/ProyectContext";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { Background } from "../components/Background";
import { LoadingScreen } from "./LoadingScreen";
("./LoadingScreen"); // Importa el componente LoadingScreen
interface ProyectData {
  _id: string;
  name: string;
  description: string;
  owner: string;
}

interface Props extends StackScreenProps<any, any> {}

export const ProjectsScreen = ({ navigation }: Props) => {
  const { getProyectByUser, removeProyect } = useContext(ProyectContext);
  const [proyects, setProyects] = useState<ProyectData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: ProyectData[] = await getProyectByUser();
      setProyects(data);
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
        setProyects([]);
      };
    }, [])
  );

  const handleRemoveProyect = async (_id: string) => {
    await removeProyect(_id);
    fetchData();
  };

  const handleTask = async (proyect: ProyectData) => {
    navigation.navigate("PantallaPrueba", {
      _id: proyect._id,
      name: proyect.name,
      description: proyect.description,
      owner: proyect.owner,
    });
  };

  const handleEditProyect = async (proyect: ProyectData) => {
    navigation.navigate("PantallaPrueba", {
      _id: proyect._id,
      name: proyect.name,
      description: proyect.description,
      owner: proyect.owner,
    });
  };

  return (
    <>
      <Background/>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : proyects.length === 0 ? (
            <Text style={styles.noProjectsText}>No existen proyectos</Text>
          ) : (
            <FlatList
              data={proyects}
              keyExtractor={(proyect) => proyect._id}
              renderItem={({ item: proyect }) => (
                <PricingCard
                  key={proyect._id}
                  color={"white"}
                  containerStyle={styles.cardContainer}
                  title={proyect.name}
                  pricingStyle={{ color: "white" }}
                  info={[`Descripcion: ${proyect.description}`]}
                  infoStyle={{ color: "white" }}
                  button={
                    <View style={styles.buttonContainer}>
                      <Button
                        color="#5566ff"
                        title="Ver Proyecto"
                        onPress={() => handleEditProyect(proyect)}
                      />
                      <Button
                        color="red"
                        title="Eliminar Proyecto"
                        onPress={() => handleRemoveProyect(proyect._id)}
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
  noProjectsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "white",
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
    shadowRadius: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProjectsScreen;
