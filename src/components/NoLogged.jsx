import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export default function NoLogged() {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <Text style={styles.text}>Para ver esta pantalla debes iniciar sesion.</Text>
      <Button title='Ir al login' onPress={() => navigation.navigate("Account")} />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 50,
    paddingHorizontal: 50,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  }
})