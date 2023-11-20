import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { PricingCard } from "@rneui/themed";
import { Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ProyectContext } from "../context/ProyectContext";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamsStackParams } from "../navigator/navigatorTypes";

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
    }, [])
  );

  const handleRemoveProyect = async (_id: string) => {
    await removeProyect(_id);
    fetchData();
  };

  const handleEditProyect = async (proyect: ProyectData) => {
    navigation.navigate("PantallaPrueba", {
      
      name: proyect.name,
      description: proyect.description,
      owner: proyect.owner,
    });
  };

  return (
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={proyects}
          keyExtractor={(proyect) => proyect._id}
          renderItem={({ item: proyect }) => (
            <PricingCard
              key={proyect._id}
              color={"white"}
              containerStyle={{
                backgroundColor: "#474747",
                borderRadius: 10,
                borderWidth: 0,
                borderColor: "transparent",
              }}
              title={proyect.name}
              pricingStyle={{ color: "white" }}
              info={[`Descripcion: ${proyect.description}`]}
              infoStyle={{ color: "white" }}
              button={
                <View style={styles.buttonContainer}>
                  <Button
                    color="green"
                    title="Ver Proyecto"
                    onPress={() => handleEditProyect(proyect)}
                  />
                  <Button
                    color="red"
                    title="Eliminar Proyecto "
                    onPress={() => handleRemoveProyect(proyect._id)}
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
