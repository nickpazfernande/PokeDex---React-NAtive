import { StyleSheet, View, Text } from "react-native";
import React from "react";
import getColorByPokemonType from "../../utils/getColorPokemon";

export default function Type(props) {
  const { types } = props;

  return (
    <View style={styles.content}>
      {/* <Text>Tipos... </Text> */}
      {types.map((item) => (
        <View
          style={{
            ...styles.pill,
            backgroundColor: getColorByPokemonType(item.type.name),
          }}
        >
          <Text key={item.type.name} style={{ textTransform: "capitalize" }}>
            {" "}
            {item.type.name}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
