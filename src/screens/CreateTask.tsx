import React, { useContext } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Background } from "../components/Background";
import { loginStyles } from "../theme/loginTheme";
import { useForm } from "../hooks/useForm";
import { ProyectContext } from "../context/ProyectContext";

interface CreateTaskProps {}

export const CreateTask: React.FC<CreateTaskProps> = () => {
//   const { createTask } = useContext(ProyectContext);

  const {
    name,
    description,
    responsible,
    startDate,
    endDate,
    project,
    onChange,
  } = useForm({
    name: "",
    description: "",
    responsible: "",
    startDate: "", 
    endDate: "",
    project: "",
  });

  const newTask = () => {
  
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      alert("Ingresa fechas válidas en el formato YYYY-MM-DD.");
      return;
    }

    
  };

  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Crear tarea</Text>

        
          <View>
            
            <TextInput
              style={loginStyles.inputField}
              placeholder="Nombre de la tarea"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "name")}
              value={name}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

        
          <View>
            
            <TextInput
              style={loginStyles.inputField}
              placeholder="Descripción de la tarea"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "description")}
              value={description}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

        
          <View>
           
            <TextInput
              style={loginStyles.inputField}
              placeholder="Nombre del responsable"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "responsible")}
              value={responsible}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View>
          
            <TextInput
              style={loginStyles.inputField}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "startDate")}
              value={startDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

        
          <View>
          
            <TextInput
              style={loginStyles.inputField}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "endDate")}
              value={endDate}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

      
          <View>
          
            <TextInput
              style={loginStyles.inputField}
              placeholder="Nombre del proyecto"
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={(value) => onChange(value, "project")}
              value={project}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

     
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={newTask}
            >
              <Text style={loginStyles.buttonText}>Crear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
