import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {
  const { user, logOut, token } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useState({}); 

  useEffect(() => {
   
    const fetchStoredUser = async () => {
      try {
        const userFromStorage = await AsyncStorage.getItem('user');
        if (userFromStorage) {
          setStoredUser(JSON.parse(userFromStorage));
        }
      } catch (error) {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      }
    };

   
    fetchStoredUser();
  }, []); 

  return (
    <View style={style.container}>
      <Text style={style.title}>Wena profeEe</Text>
      <Button title="logout" color="#6534D3" onPress={logOut} />
      <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text>{JSON.stringify(storedUser, null, 5)}</Text>
      <Text>{token}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
