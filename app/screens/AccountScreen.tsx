import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import {
  View,
  TextInput,
  InputLabel,
  Title,
  TouchableOpacity,
  TextButton,
  CancelButton,
} from "../components/Themed";
//import api from "../../services/api";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ActivityIndicator } from "../components/ActitivityIndicator";
import { UserInterfaceIdiom } from "expo-constants";



const signUpValidationSchema = yup.object().shape({
	username: yup
    .string()
    .min(8, ({ min }) => `O nome de usuário deve conter pelo menos ${min} caracteres`)
    .required("Campo obrigatório"),
	email: yup
    .string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, ({ min }) => `A senha deve conter pelo menos ${min} caracteres`)
    .required("Campo obrigatório"),
});


export default function TabAccountScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const logout = () => {
    AsyncStorage.clear().then(() => {
      navigation.navigate("Login");
    });
  };
  

  const handleSaveClick = async (values: any) => {
    const { email, username, password } = values;

  };



  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors[colorScheme].background }}
    >
      <CancelButton/>
      <View style={styles.container}>
        <Title style={styles.title}>Configurações da conta</Title>
        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSaveClick}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <InputLabel>Alterar nome de usuário</InputLabel>
                <Field
                  component={TextInput}
                  name="username"
                  placeholder="Nome de usuário atual"
                  style={styles.signUpInput}
                  containerStyle={styles.signUpBar}
                  icon={{
                    name: "ios-person",
                    size: 20,
                    color: Colors[colorScheme].tint,
                  }}
                />

                <InputLabel>Alterar e-mail</InputLabel>
                <Field
                  component={TextInput}
                  name="email"
                  placeholder="E-mail atual"
                  keyboardType="email-address"
                  style={styles.signUpInput}
                  containerStyle={styles.signUpBar}
                  icon={{
                    name: "ios-mail",
                    size: 20,
                    color: Colors[colorScheme].tint,
                  }}
                />

                <InputLabel>Alterar senha</InputLabel>
                <Field
                  component={TextInput}
                  name="password"
                  placeholder="Senha atual"
                  secureTextEntry={true}
                  style={styles.signUpInput}
                  containerStyle={styles.signUpBar}
                  icon={{
                    name: "ios-lock-closed",
                    size: 20,
                    color: Colors[colorScheme].tint,
                  }}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit as (values: any) => void}
                  disabled={!isValid}
                >
                  <TextButton style={styles.buttonText}>
                    Salvar alterações
                  </TextButton>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        <TouchableOpacity style={styles.exitButton} onPress={logout}>
          <TextButton style={styles.buttonText}>
            Sair da conta
          </TextButton>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 50,
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  exitButton: {
    height: 40,
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "dustismo",
    backgroundColor: "#ff0000"
  },

  signUpInput: {
    fontFamily: "dustismo",
  },

  signUpBar: {
    marginTop: 5,
  },

  saveButton: {
    height: 40,
    width: 200,
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "dustismo",
  },

  buttonText: {
    fontSize: 18,
    fontFamily: "dustismo",
  },

});