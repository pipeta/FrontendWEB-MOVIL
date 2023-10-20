import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, ImageBackground, Keyboard } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';

export const SettingsScreen = () => {
  const {user,update} = useContext(AuthContext)
  const onSaveChanges = () => {
    console.log(email,password,userName)
    Keyboard.dismiss();
    update({
      email,
      password,
      userName,
    })
  };

  const { email, password,userName, onChange } = useForm({
    email: "",
    password: "",
    userName: "",
  });

  // const onSubmit= () => {
  //   Keyboard.dismiss();
  //   console.log("voy entrar aca");
  //   // signIn({ email, password });
  // };
  // useEffect(() => {
  //   if (errorMessage.length === 0) return;
  //   console.log(errorMessage);
  //   Alert.alert("Error", errorMessage, [
  //     {
  //       text: "ok",
  //       onPress: removeError,
  //     },
  //   ]);
  // }, [errorMessage]);

  
  console.log('User from SettingsScreen:', user);
  
  return (
    <ImageBackground
    source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")} // Asegúrate de proporcionar la ruta correcta de tu imagen
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[loginStyles.title, styles.title]}>Editar Perfil</Text>

        <Text style={[loginStyles.label, styles.label]}>Nombre:</Text>
        <TextInput
          placeholder= {user?.userName}
          placeholderTextColor="rgba(0,0,0,0.4)"
          style={[loginStyles.inputField, styles.inputField]}
          selectionColor="white"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, "userName")}
          value={userName}
          onSubmitEditing={onSaveChanges}
        />

        <Text style={[loginStyles.label, styles.label]}>Email:</Text>
        <TextInput
          placeholder={user?.email}
          placeholderTextColor="rgba(0,0,0,0.4)"
          keyboardType="email-address"
          style={[loginStyles.inputField, styles.inputField]}
          selectionColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, "email")}
          value={email}
          onSubmitEditing={onSaveChanges}
        />

        <Text style={[loginStyles.label, styles.label]}>Contraseña:</Text>
        <TextInput
          placeholder="******"
          placeholderTextColor="rgba(0,0,0,0.4)"
          secureTextEntry
          style={[loginStyles.inputField, styles.inputField]}
          selectionColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, "password")}
          value={password}
          onSubmitEditing={onSaveChanges}
        />
        <View>

        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[loginStyles.button, styles.button, {marginTop:20}]}
          onPress={onSaveChanges}
        >
          <Text style={[loginStyles.buttonText, styles.buttonText]}>Editar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white', // Cambia el color del título si lo deseas
  },
  label: {
    color: 'white', // Cambia el color del texto de las etiquetas si lo deseas
  },
  inputField: {
    color: 'black', // Cambia el color del texto de los campos de entrada si lo deseas
    // Otros estilos específicos si es necesario
  },
  buttonText: {
    color: 'black', // Cambia el color del texto del botón si lo deseas
  },
  button: {
    // Otros estilos específicos del botón si es necesario
  },
});

export default SettingsScreen;
