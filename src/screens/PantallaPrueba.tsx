import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
          {"Placeholder\n#Placeholder"}
        </Text>
      </View>

      {/* Detalles y Loading */}
      <View style={styles.loadingIndicator}>
        <ActivityIndicator color="red" size={50} />
      </View>
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
    color:'white'
  },
  Name: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",

    alignSelf: "flex-start",
    left: 20,
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
