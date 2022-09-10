import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import React, {useState} from "react";
import { Formik, useFormik } from "formik"
import * as Yup from "yup"
import {user, userDetails} from "../../utils/userDB"
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  //State error
  const [error, setError] = useState("");
  //Recuperamos datos y funciones del context
  const { login } = useAuth();
  // console.log(useAuth())
  //Configuration formik, object 
  const formik = useFormik({
    //Initial values for the form
    initialValues: initialValues(),
    //Validation data form 
    validationSchema: Yup.object(validationSchema()),
    //not validation in real time? next line
    validateOnChange: false,
    //Event of submit form
    onSubmit: (formValue) => {
      setError("");
      //Get values form
      const {username, password} = formValue;
      //Compare with date "userDB"
      if(username !== user.username || password !== user.password){
        setError("El usuario o la contraseña no son correctos.")
      } else {
        //Si esta todo bien, ingreso la informacion al contexto. 
        login(userDetails)
        //Y dirijo a detalles del usuario
      }
    }
  })

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Iniciar sesion</Text>
      <TextInput 
        placeholder="Nombre de usuario"
        style={styles.input}
        //disabled first capital letter
        autoCapitalize="none"
        //Initial value
        value={formik.values.username}
        //On change value, set "username" with text
        onChangeText={(text) => formik.setFieldValue("username",text)}
      />
      <TextInput 
        placeholder="Contraseña"
        style={styles.input}
        //mode password
        secureTextEntry={true}
        //disabled first capital letter
        autoCapitalize="none"
        value={formik.values.password}
        onChangeText={(text) =>formik.setFieldValue("password", text)}
      />
      <Button 
        title="Entrar"
        style={styles.button}
        //Go event the formik, line 19.
        onPress={formik.handleSubmit}
      />
      {/* Renderizo solo si existen los errores */}
      {formik.errors.username? <Text style={styles.error} > {formik.errors.username} </Text> : ""}
      {formik.errors.password? <Text style={styles.error} > {formik.errors.password} </Text> : ""}
      {error? <Text style={styles.error} > {error}  </Text> : ""}
    </View>
  );
}

//Functio to return initialValues for formik
function initialValues () {
  return{
    username: "",
    password: ""
  } 
}

//Function validate inputs (YUP)
function validationSchema() {
  //2 input type string and required!
  return {
    username: Yup.string().required("El usuario es obligatorio."),
    password: Yup.string().required("La password es obligatoria.")
  }
}

const styles = StyleSheet.create({
    // content:{
    //     margin:20
    // },
    title:{
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 50,
        marginBottom: 15
    },
    input:{
        height:40,
        margin:20,
        borderWidth:1,
        padding: 10,
        borderRadius: 10,
    },
    error:{
      textAlign: "center",
      color: "#f00",
      marginTop: 20,
    }
})
