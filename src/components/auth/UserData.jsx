import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, {useCallback, useState} from "react";
import useAuth from "../../hooks/useAuth";
import { getPokemonFavoriteApi } from "../../api/favorite";


export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0)

  useFocusEffect(
    
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonFavoriteApi();
          setTotal(response.length);
        } catch (error) {
          setTotal(0);
          console.log(error)
        }
      })();
      // console.log('hola')
    }, [])
  );


  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}> Bienvenido, </Text>
        <Text style={styles.title}>
          {`${auth.firstName} ${auth.lastName}`}{" "}
        </Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={`${auth.username}`} />
        <ItemMenu title="Email" text={`${auth.email}`} />
        <ItemMenu
          title="Total Favoritos"
          text={total + ' pokemons'}
        />
      </View>

      <Button title="Cerrar cesion" onPress={logout}>

      </Button>
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;

  return (
    <View style={styles.ItemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:  </Text>
      <Text>{text }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
    paddingHorizontal: 10
  },
  ItemMenu:{
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#cfcfcf"
  },
  itemMenuTitle:{
    fontWeight: "bold",
    paddingRight: 10,
    width: 120
  }
});
