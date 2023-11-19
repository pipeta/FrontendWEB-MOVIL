import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
  Keyboard,
} from "react-native";
import { loginStyles } from "../theme/loginTheme";
import { TeamContext } from "../context/TeamContext";
import { useForm } from "../hooks/useForm";
import { Picker } from "@react-native-picker/picker";
import AddIntegrantes from "../components/AddIntegrantes";
import DynamicFormApp from "../components/AddIntegrantes";

export const DefaultScreen = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const crearEquipo = () => {};

  const { fetchTeams, createTeam } = useContext(TeamContext);
  const { createTeamDto, onChange } = useForm({
    createTeamDto: "",
  });

  const onCreate = () => {
    if (createTeamDto.trim() === "") {
      Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
      return;
    }

    Keyboard.dismiss();
    createTeam(createTeamDto);
  };

  return (
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.title, loginStyles.title]}>
          Gestión de Equipos
        </Text>

        <TextInput
          style={[styles.input, loginStyles.inputField]}
          placeholder="Nombre del Equipo"
          onChangeText={(value) => onChange(value, "createTeamDto")}
          value={createTeamDto}
          onSubmitEditing={onCreate}
        />
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          // style={styles.picker}
          style={[ loginStyles.inputField,styles.picker]}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
       
        {/* <AddIntegrantes></AddIntegrantes>
         */}
         <DynamicFormApp></DynamicFormApp>
        <View style={[styles.buttonContainer]}>
          <Button
            title="Crear Equipo"
            onPress={onCreate}
            color={"transparent"}
          />
        </View>
     
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: "3%",
    width: "40%",
    backgroundColor: "#841584",
  },
  picker: {
    height: 40,
    width: "80%",
   
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    
    
  },
});
