import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface TareaData {
  name: string;
  proyect_id: string;
  responsable: string;
}

export const Tareas = () => {
  const [tareas, setTareas] = useState<TareaData[]>([
    { name: "Tarea 1", proyect_id: "Proyecto A", responsable: "Usuario 1" },
    { name: "Tarea 2", proyect_id: "Proyecto B", responsable: "Usuario 2" },
    // Agrega más datos estáticos según sea necesario
  ]);

  useFocusEffect(
    React.useCallback(() => {
      // Puedes agregar lógica adicional aquí si es necesario
      return () => {
        // Puedes agregar lógica de limpieza aquí si es necesario
      };
    }, [])
  );

  const handleTareaPress = (selectedTarea: TareaData) => {
    // Aquí puedes navegar a la pantalla de detalle de tareas o realizar otra acción
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {tareas.length > 0 ? (
          tareas.map((tarea, index) => (
            <TouchableOpacity
              key={index.toString()} // Usamos el índice como clave (key) temporal
              activeOpacity={0.9}
              style={styles.column}
              onPress={() => handleTareaPress(tarea)}
            >
              <View
                style={{
                  ...styles.cardContainer,
                  backgroundColor: "#474747",
                }}
              >
                <View>
                  <Text style={styles.title}>{tarea.name}</Text>
                  <Text style={styles.subText}>{`Proyecto: ${tarea.proyect_id}`}</Text>
                  <Text style={styles.subText}>{`Responsable: ${tarea.responsable}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTareasText}>No hay tareas disponibles.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 10,
  },
  cardContainer: {
    marginVertical: 10,
    height: 120,
    width: Dimensions.get("window").width * 0.4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#474747",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subText: {
    fontSize: 16,
    color: "white",
  },
  column: {
    width: "50%",
  },
  noTareasText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
