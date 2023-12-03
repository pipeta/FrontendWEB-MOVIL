import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ImageBackground,
  Keyboard,
} from "react-native";
import { loginStyles } from "../theme/loginTheme";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { PricingCard, lightColors } from "@rneui/themed";
import { Background } from "../components/Background";
export const SettingsScreen = () => {
  const { user, update } = useContext(AuthContext);
  const { email, password, userName, onChange } = useForm({
    email: user?.email || "",
    password: "",
    userName: user?.userName || "",
  });

  const onSaveChanges = () => {
    Keyboard.dismiss();

    if (password.trim() === "") {
      Alert.alert("Error", "La contraseña no puede estar vacía");
    } else {
      update({
        email,
        password,
        userName,
      });
    }
  };

  return (
    <>
      <Background />
      <View style={styles.container}>
        <Text style={[loginStyles.title, styles.title]}>Editar Perfil</Text>

        <Text style={[loginStyles.label, styles.label]}>Nombre:</Text>
        <TextInput
          placeholder={user?.userName}
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

        <TouchableOpacity
          activeOpacity={0.8}
          style={[loginStyles.button, styles.button, { marginTop: 20 }]}
          onPress={onSaveChanges}
        >
          <Text style={[loginStyles.buttonText, styles.buttonText]}>
            Editar
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
  },
  label: {
    color: "white",
  },
  inputField: {
    color: "black",
  },
  buttonText: {
    color: "black",
  },
  button: {},
});

export default SettingsScreen;
