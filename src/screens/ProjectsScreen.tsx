import React, { useContext, useState } from "react";

import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { PricingCard } from "@rneui/themed";
import { Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ProyectContext } from "../context/ProyectContext";

interface ProyectData {
  id: string;
  name: string;
  description: string;
  owner: string;
}

export const ProjectsScreen = () => {
  const { getProyectByUser, removeProyect } = useContext(ProyectContext);
  console.log("ProyectContext value:", getProyectByUser);
  const [proyects, setProyects] = useState<ProyectData[]>([]);

  const fetchData = async () => {
    try {
      const data: ProyectData[] = await getProyectByUser();
      setProyects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();

      return () => {
        setProyects([]);
      };
    }, [getProyectByUser])
  );

  const handleRemoveProyect = async (id: string) => {
    await removeProyect(id);
    fetchData();
  };

  const handleEditProyect = async (id: string) => {
    console.log("hola");
    
  };

  return (
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={proyects}
          keyExtractor={(proyect) => proyect.id}
          renderItem={({ item: proyect }) => (
            <FlatList
              data={proyects}
              renderItem={({ item: proyect }) => (
                <PricingCard
                  key={proyect.id} 
                  color={"white"}
                  containerStyle={{
                    backgroundColor: "#474747",
                    borderRadius: 10,
                    borderWidth: 0,
                    borderColor: "transparent",
                  }}
                  price={proyect.name}
                  title={proyect.owner}
                  pricingStyle={{ color: "white" }}
                  info={[`Descripcion: ${proyect.description}`]}
                  infoStyle={{ color: "white" }}
                  button={
                    <View style={styles.buttonContainer}>
                      <Button
                        color="green"
                        title="Ver Proyecto"
                        onPress={() => handleEditProyect(proyect.id)}
                      />
                      <Button
                        color="red"
                        title="Eliminar Proyecto "
                        onPress={() => handleRemoveProyect(proyect.id)}
                      />
                    </View>
                  }
                />
              )}
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

export default ProjectsScreen;
