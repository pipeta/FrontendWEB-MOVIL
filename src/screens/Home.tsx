import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { TeamContext } from '../context/TeamContext';

const Home = () => {
    const {status, update,user, logOut} = useContext(AuthContext);
    const {fetchTeams} = useContext(TeamContext);
  return (
    <ImageBackground
      source={require('../theme/pngtree-simple-lights-on-black-background-image_556934.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bienvenido a capstone+1</Text>
        <Text style={styles.infoText}>Navegue por el sidebar para más opciones</Text>
        {/* <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar Estado</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={logOut} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <div>aaa</div>
        <TouchableOpacity onPress={fetchTeams} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Para cubrir todo el fondo
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white', // Color del texto
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: 'white', // Color del texto
    textAlign: 'center',
    fontWeight:'bold'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
