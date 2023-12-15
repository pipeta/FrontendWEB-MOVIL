import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FAB } from "@rneui/themed";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Equipos } from "../components/Equipos";
import { Divider } from "@rneui/base";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { Team } from "../interfaces/teamInterfaces";
import { LoadingScreen } from "../screens/LoadingScreen";
import { ProyectContext } from "../context/ProyectContext";
import { FontAwesome } from "@expo/vector-icons";
interface Props extends StackScreenProps<TeamsStackParams, "PantallaPrueba"> {
  route: RouteProp<TeamsStackParams, "PantallaPrueba">;
}

export const PantallaPrueba = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const { _id, name, description, owner } = route.params;
  const [descriptionLines, setDescriptionLines] = useState(2);
  const [ownerLines, setOwnerLines] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isFABLoading, setIsFABLoading] = useState(false);
  const [isTaskButtonLoading, setIsTaskButtonLoading] = useState(false);
  const { getTeamsByProyect } = useContext(ProyectContext);

  const handleFABPress = async () => {
    try {
      setIsFABLoading(true);
      await navigation.navigate("AddTeamsScreen", { _id: _id });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFABLoading(false);
    }
  };

  const handleTaskPress = async () => {
    try {
      setIsTaskButtonLoading(true);
      await navigation.navigate("SearchScreen", { _id: _id });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTaskButtonLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: Team[] = await getTeamsByProyect(_id);
      setTeams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNavigatePress = () => {
    navigation.navigate("UpdateProyectScreen", {
      _id: _id,
      name: name,
      description: description,
     
     
    });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
    return () => {
      setTeams([]);
    };
  }, [_id]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();

  //     return () => {
  //       setTeams([]);
  //     };
  //   }, [_id])
  // );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFF0" }}>
      <View style={{ ...styles.headerContainer }}>

        <TouchableOpacity
          onPress={handleGoBack}
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 15 }}
        >
          <FontAwesome name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigatePress}
          style={{ ...styles.editButton, top: top + 15, right: 20 }}
        >
          <FontAwesome name="edit" size={30} color="white" />
        </TouchableOpacity>
        <Divider></Divider>

        {/* <View style={{ ...styles.infoContainer, marginTop: top + 70 }}>
          
        </View> */}
        {/* <Text style={{ ...styles.Name, top: top + 40 }}>{`Name: ${name}`}</Text> */}

        <View style={{ width: "100%", paddingHorizontal: 10,paddingTop:15 }}>
        <Text
            style={{
              ...styles.subName,
              top: top + 60,
            }}
            numberOfLines={descriptionLines}
            onTextLayout={(e) =>
              setDescriptionLines(e.nativeEvent.lines.length)
            }
          >
            {`Nombre: ${name}`}
          </Text>
          <Text
            style={{
              ...styles.subName,
              top: top + 60,
            }}
            numberOfLines={descriptionLines}
            onTextLayout={(e) =>
              setDescriptionLines(e.nativeEvent.lines.length)
            }
          >
            {`Descripción: ${description}`}
          </Text>
          <Text
            style={{
              ...styles.subName,
              top: top + 60,
            }}
            numberOfLines={ownerLines}
            onTextLayout={(e) => setOwnerLines(e.nativeEvent.lines.length)}
          >
            {`Creador: ${owner}`}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.button,
            top: top + 100,
            alignSelf: "flex-start",
            left: 10,
            backgroundColor: "#5566ff",
          }}
          onPress={handleTaskPress}
          disabled={isTaskButtonLoading}
        >
          <Text style={styles.buttonText}>
            {isTaskButtonLoading ? "Cargando..." : "Ver Tareas"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 10,
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <Text style={styles.Title}>{"Equipos"}</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : teams.length === 0 ? (
          <Text style={styles.noTeamsText}>No hay equipos disponibles.</Text>
        ) : (
          <Equipos proyectId={_id} />
        )}
      </View>
      <Divider></Divider>
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          // backgroundColor: "#007bff",
        }}
        color="green"
        title={isFABLoading ? "Cargando..." : "+"}
        size="large"
        onPress={handleFABPress}
        disabled={isFABLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#171a1f",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  backButton: {
 
    position: "absolute",
    left: 20,
    color: "white",
    
    
  },
  Name: {
    color: "white",
    fontSize: 70,
    fontWeight: "bold",
    alignSelf: "flex-start",
    left: 20,
  },
  subName: {
    // color: "white",
    // fontSize: 20,
    // fontWeight: "bold",
    // marginTop: 10,
    // alignSelf: "flex-start",
    // left: 20,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  Title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noTeamsText: {
    fontSize: 18,
    color: "black", 
    textAlign: "center",
    marginTop: 20,
  },
  editButton: {
    position: "absolute",
    top: 15,
    right: 20,
    zIndex: 1,
  }, 
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
 
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
