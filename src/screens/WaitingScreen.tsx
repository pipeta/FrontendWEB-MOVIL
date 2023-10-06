import React, { useContext } from 'react'
import { Text, View,StyleSheet, Button } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export const ProtectedScreen = () => {

   const {user,logOut,token} = useContext(AuthContext)
  return (
    <View style={style.container}>

        <Text style={style.title}>Wena profeEe</Text>

        <Button
            title='logout'
            color="#6534D3"
            onPress={logOut}
        />
        <Text>
            {JSON.stringify(user?.email)}
            {JSON.stringify(user?.userName)}
            {token}
        </Text>

        
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginBottom:20
    }
})