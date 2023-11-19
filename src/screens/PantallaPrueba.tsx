import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { FAB, Icon } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Equipos } from "../components/Equipos";
import { loginStyles } from "../theme/loginTheme";
import { Divider } from "@rneui/base";

interface Props extends StackScreenProps<any, any> {}

export const PantallaPrueba = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      {/* Heade Containerr */}
      <View
        style={{
          ...styles.headerContainer,
        }}
      >
        {/* Backbutton */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 5,
          }}
        >
          <ArrowLeftOutlined />
        </TouchableOpacity>

        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.Name,
            top: top + 40,
          }}
        >
          {"Nombre del Proyecto"}
        </Text>
        <Text
          style={{
            ...styles.subName,
            top: top + 40,
          }}
        >
          {"Descripcion proyecto"}
        </Text>
        <Text
          style={{
            ...styles.subName,
            top: top + 40,
          }}
        >
          {"Creador:"}
        </Text>
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
        <Equipos />
      </View>
      <Divider></Divider>
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#007bff", // Cambia el color según tus necesidades
        }}
        title={"+"}
        size="large"
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    // borderBottomRightRadius: 1000,
    // borderBottomLeftRadius: 1000,
    backgroundColor: "#474747", // Cambia el color de fondo según tus necesidades
  },
  backButton: {
    position: "absolute",
    left: 20,
    color: "white",
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
