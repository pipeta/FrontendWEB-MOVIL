import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FAB, Icon } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Equipos } from "../components/Equipos";
import { Divider } from "@rneui/base";
import { RouteProp } from "@react-navigation/native";
import { TeamsStackParams } from "../navigator/navigatorTypes";


interface Props extends StackScreenProps<TeamsStackParams, "PantallaPrueba"> {
  route: RouteProp<TeamsStackParams, "PantallaPrueba">;
}

export const PantallaPrueba = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const { _id,name, description, owner } = route.params;
  const handleFABPress = () => {
    navigation.navigate("AddTeamsScreen",  {_id:_id}  );
  };


 
  return (
    <View style={{ flex: 1 }}>
    
      <View style={{ ...styles.headerContainer }}>
       
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 5 }}
        >
          <ArrowLeftOutlined />
        </TouchableOpacity>
        <Divider></Divider>

       
        <Text style={{ ...styles.Name, top: top + 40 }}>{`Name: ${name}`}</Text>
        <Text style={{ ...styles.subName, top: top + 40 }}>{`Descripción: ${description}`}</Text>
        <Text style={{ ...styles.subName, top: top + 40 }}>{`Creador: ${owner}`}</Text>
      </View>

      <View style={{ alignItems: "center", paddingHorizontal: 10, paddingBottom: 10, paddingTop: 10 }}>
        <Text style={styles.Title}>{"Equipos"}</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}>
        <Equipos proyectId={_id} />
      </View>
      <Divider></Divider>
      <FAB
        style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: "#007bff" }}
        title={"+"}
        size="large"
        onPress={handleFABPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    backgroundColor: "#474747",
  },
  backButton: {
    flex:1,
    position: "absolute",
    left: 20,
    color: "white",
    alignItems:"flex-start"
  },
  Name: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "flex-start",
    left: 20,
  },
  subName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    alignSelf: "flex-start",
    left: 20,
  },
  Title: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
