import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import { loginStyles } from "../theme/loginTheme";
import { Card } from "react-native-paper";
const DefaultScreen = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [integrantes, setIntegrantes] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [equipos, setEquipos] = useState([
    {
      id: 1,
      nombre: "Equipo 1",
      integrantes: ["Integrante 1", "Integrante 2", "Integrante 3"],
    },
    {
      id: 2,
      nombre: "Equipo 2",
      integrantes: ["Integrante 4", "Integrante 5"],
    },
    // ...otros equipos
  ]);

  const crearEquipo = () => {
    const nuevoEquipo = {
      id: equipos.length + 1,
      nombre: nombreEquipo,
      integrantes: integrantes
        .split(",")
        .map((integrante) => integrante.trim()),
    };
    setEquipos([...equipos, nuevoEquipo]);
    setNombreEquipo("");
    setIntegrantes("");
  };

  const eliminarEquipo = (id: any) => {
    setEquipos(equipos.filter((equipo) => equipo.id !== id));
  };

  return (
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Equipos</Text>

        {/* Formulario para Crear Equipos */}
        <TextInput
          style={[loginStyles.inputField, styles.input]}
          placeholder="Nombre del Equipo"
          value={nombreEquipo}
          onChangeText={(text) => setNombreEquipo(text)}
        />
        <TextInput
          style={[loginStyles.inputField, styles.input]}
          placeholder="Integrantes (separados por comas)"
          value={integrantes}
          onChangeText={(text) => setIntegrantes(text)}
        />

         {/* Botón para Crear Equipo */}
      <View style={styles.buttonContainer}>
        <Button
          title="Crear Equipo"
          // Color de texto del botón
          onPress={crearEquipo}
          color={'transparent'}
        />
      </View>

      </View>
     
      {/* Lista de Equipos */}

      {/* Modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
      <Card style={{ padding: 10, margin: 10 }}>
        <Button
          onPress={() => {}}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerTeams: {
    flex: 1,
    padding: 16,
    borderColor: "rgba(255, 255, 255, 0.2)", // Color del borde (un poco más claro que el fondo)
    borderRadius: 10,
    marginBottom: 90,
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
  itemContainer: {
    marginBottom: 16,
  },
  itemContainerTeams: {
    marginBottom: 16,
    // Color del borde de las secciones de equipos
    // Ancho del borde de las secciones de equipos
    borderRadius: 10, // Radio de borde de las secciones de equipos
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  buttonContainer: {
    flexDirection: "row", // Esto coloca los botones en una fila
    // Esto distribuye el espacio entre los botones
    margin:'auto',
     // Puedes ajustar el espacio entre los botones y el texto
    justifyContent: "center",
    fontSize: 16,
    borderRadius: 20,
  
    paddingVertical:'3%',
    width:'40%',
    
    backgroundColor: "#841584",
  },
  deleteButton: {
    color: "red",
    fontSize: 16,
  },
  editButton: {
    color: "green",
    fontSize: 16,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  itemTitleTeams: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  itemIntegrante: {
    fontSize: 16,
    marginBottom: 4,
    borderColor: "#2196F3", // Color del borde de los integrantes
    borderWidth: 1, // Ancho del borde de los integrantes
    borderRadius: 5, // Radio de borde de los integrantes
    padding: 5, // Espaciado interno de los integrantes
  },
  deleteButton2: {
    color: "red",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // Para cubrir todo el fondo
    justifyContent: "center",
  },
});

export default DefaultScreen;
