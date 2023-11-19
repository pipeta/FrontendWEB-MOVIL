import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const DynamicFormApp = () => {
  const [forms, setForms] = useState([
    { id: 1, name: "", email: "", phone: "" },
  ]);

  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedForms = forms.map((form) =>
      form.id === id ? { ...form, [field]: value } : form
    );
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    const newId = forms[forms.length - 1].id + 1;
    setForms([...forms, { id: newId, name: "", email: "", phone: "" }]);
  };

  const handleRemoveForm = (id: number) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
  };

  const handleSubmit = () => {
    // Puedes realizar acciones con todos los datos del formulario
    console.log("Datos del formulario:", forms);
    // Puedes enviar los datos a un servidor, realizar validaciones, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar integrantes</Text>
      <ScrollView>
        {forms.map((form) => (
          <View key={form.id} style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={form.name}
              onChangeText={(text) => handleInputChange(form.id, "name", text)}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveForm(form.id)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddForm}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    // fontSize: 24,
    marginBottom: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  addButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  submitButton: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default DynamicFormApp;
