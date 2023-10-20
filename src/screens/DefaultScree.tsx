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

const DefaultScreen = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");

  const crearEquipo = () => {
    // Lógica para crear un equipo
  };

  const { fetchTeams ,createTeam} = useContext(TeamContext);
  const { createTeamDto, onChange } = useForm({
    createTeamDto: "",
    
  });

  const onCreate = () => {
    // Validar los datos aquí si es necesario antes de llamar a signUp
    if (
      
      createTeamDto.trim() === "" 
    
    ) {
      Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
      return;
    }

    
    Keyboard.dismiss();
    createTeam( createTeamDto );
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

        {/* Formulario para Crear Equipos */}
        <TextInput
          style={[styles.input, loginStyles.inputField]}
          placeholder="Nombre del Equipo"
          onChangeText={(value) => onChange(value, "createTeamDto")}
          value={createTeamDto}
          onSubmitEditing={onCreate}
        />

        {/* Botón para Crear Equipo */}
        <View style={styles.buttonContainer}>
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
    alignItems: "center", // Alinea los elementos al centro del contenedor
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
    alignItems: "center", // Alinea el botón al centro horizontalmente
    borderRadius: 20,
    paddingVertical: "3%",
    width: "40%",
    backgroundColor: "#841584",
  },
});

export default DefaultScreen;
