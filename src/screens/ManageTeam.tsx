import React, { useContext, useState } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from "react-native"; // Asegúrate de importar Text de react-native
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { TeamContext } from "../context/TeamContext";

export interface Equipo {
  id: number;
  nombre: string;
  integrantes: string[];
}

export const ManageTeam = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [integrantes, setIntegrantes] = useState("");
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [integranteActual, setIntegranteActual] = useState<Equipo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {fetchTeams} = useContext(TeamContext);
  
  const [equipos, setEquipos] = useState<Equipo[]>([
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
    {
      id: 3,
      nombre: "Equipo 1",
      integrantes: ["Integrante 1", "Integrante 2", "Integrante 3"],
    },
    {
      id: 4,
      nombre: "Equipo 1",
      integrantes: ["Integrante 1", "Integrante 2", "Integrante 3"],
    },
  ]);
  const agregarIntegranteAlEquipo = () => {
    if (integranteActual && nuevoIntegrante.trim() !== "") {
      const nuevoEquipo = equipos.map((equipo) =>
        equipo.id === integranteActual.id
          ? {
              ...equipo,
              integrantes: [...equipo.integrantes, nuevoIntegrante],
            }
          : equipo
      );
      console.log("Equipo antes de la actualización:", equipos);
      console.log("Nuevo equipo:", nuevoEquipo);
      setEquipos(nuevoEquipo);
    }
    setModalVisible(false);
    setNuevoIntegrante("");
  };

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
      {/* <View style={styles.containerTeams}> */}
      <Card style={styles.containerTeams}>
        <FlatList
          data={equipos}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainerTeams}>
              <Text style={styles.itemTitleTeams}>{item.nombre}</Text>
              <FlatList
                data={item.integrantes}
                keyExtractor={(integrante) => integrante}
                renderItem={({ item: integrante }) => (
                  <Text style={styles.itemIntegrante}>{integrante}</Text>
                )}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => eliminarEquipo(item.id)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
                <View>
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
                        <Text style={styles.modalText}>Agregar Integrante</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Nombre del Integrante"
                          onChangeText={(text) => setNuevoIntegrante(text)}
                          value={nuevoIntegrante}
                        />
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={agregarIntegranteAlEquipo}
                        >
                          <Text style={styles.textStyle}>Agregar</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                      setIntegranteActual(item); // Establece integranteActual al equipo actual
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.textStyle}>Editar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </Card>
      {/* </View> */}
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
  },
  containerTeams: {
    flex: 1,

    borderColor: "rgba(255, 255, 255, 0.2)", // Color del borde (un poco más claro que el fondo)
    // borderRadius: 10,
    // marginBottom: 100,
    margin: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
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
    justifyContent: "space-between", // Esto distribuye el espacio entre los botones
    marginTop: 8, // Puedes ajustar el espacio entre los botones y el texto
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
    color: "red",
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
});

export default ManageTeam;
