import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { TeamsStackParams } from '../navigator/navigatorTypes';

interface Props extends StackScreenProps<TeamsStackParams, 'EditTestScreen'> {}

export const EditTestScreen = ({ route }: Props) => {
  const { _id, name, autor, uniqueCode } = route.params;

  console.log('Received parameters:', { _id, name, autor, uniqueCode });

  return (
    <View>
      <Text>asd</Text>
      {/* Ahora puedes usar los parámetros recibidos según sea necesario en tu componente */}
    </View>
  );
};
