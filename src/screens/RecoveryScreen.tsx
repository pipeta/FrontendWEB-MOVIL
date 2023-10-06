import React, { useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View,TouchableOpacity  } from 'react-native';
import { Background } from '../components/Background';
import { loginStyles } from '../theme/loginTheme';

import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const ResetPasswordScreen = ({ navigation }: Props) => {
  const { resetPassword } = useContext(AuthContext);

  const { email, onChange } = useForm({
    email: '',
  });

  const onResetPassword = () => {
    Keyboard.dismiss();
    resetPassword({ email });
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>Recuperar Contraseña</Text>

          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onResetPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onResetPassword}
            >
              <Text style={loginStyles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}
          >
             <Text style={loginStyles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
