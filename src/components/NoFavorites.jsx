import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function NoFavorites() {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Text style={styles.title}>No tienes pokemons favoritos.</Text>
      <Text style={styles.text}>Dirigite a la pokedex!</Text>
      <View style={styles.contentButton}>
        <Button
          title="Ir a PokeDex"
          onPress={() => navigation.navigate("PokeDex")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: "50%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
  },
  contentButton: {
    marginHorizontal: 30,
    marginTop: 20
  }
});
