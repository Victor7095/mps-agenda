import React, { useState, useContext } from "react";
import { StyleSheet, Alert, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ActivityIndicator } from "../components/ActitivityIndicator";

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

export default () => {
	const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpClick = async (values: any) => {
    const { name, email, username, password } = values;
		
    try {
      setIsLoading(true);
      const res = await api.post("/auth/sign_up", {
        user: {
          name: name || username,
          email,
          username,
          password,
        },
      });
      const token = await AsyncStorage.setItem(
        "@Cronoz:accessToken",
        res.data.access_token
      );
      await AsyncStorage.setItem(
        "@Cronoz:refreshToken",
        res.data.refresh_token
      );
      navigation.navigate("TabNavigator");
    } catch (err) {
      let msg = "Houve um erro no seu cadastro";
      msg = err.response.data.message || msg;
      Alert.alert("Erro", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors[colorScheme].background }}
    >
      {isLoading && <ActivityIndicator />}
      <CancelButton />
      <View style={styles.container}>
				<Image
					style={styles.logo}
					source={{ uri: "https://i.imgur.com/EBPBJTM.png" }}
				/>
        <Title style={styles.title}>Cadastrando usuário</Title>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            name: "",
            username: "",
						email: "",
            password: "",
          }}
          onSubmit={handleSignUpClick}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <InputLabel>Nome de usuário</InputLabel>
              <Field
                component={TextInput}
                name="username"
                placeholder="Digite um nome de usuário"
                style={styles.signUpInput}
                containerStyle={styles.signUpBar}
                icon={{
                  name: "ios-person",
                  size: 20,
                  color: Colors[colorScheme].tint,
                }}
              />

              <InputLabel>E-mail</InputLabel>
              <Field
                component={TextInput}
                name="email"
                placeholder="Digite um e-mail válido"
                keyboardType="email-address"
                style={styles.signUpInput}
                containerStyle={styles.signUpBar}
                icon={{
                  name: "ios-mail",
                  size: 20,
                  color: Colors[colorScheme].tint,
                }}
              />

              <InputLabel>Senha</InputLabel>
              <Field
                component={TextInput}
                name="password"
                placeholder="Digite uma senha"
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
                style={styles.signUpButton}
                onPress={handleSubmit as (values: any) => void}
                disabled={!isValid}
              >
                <TextButton style={styles.signUpButtonText}>
                  Cadastrar-se
                </TextButton>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 30,
  },

	logo: {
    width: 150,
    height: 45,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

	title: {
    fontWeight: 'bold',
		marginTop: 35,
		marginBottom: 5,
  },

  signUpInput: {
    fontFamily: "dustismo",
  },

  signUpBar: {
    marginTop: 5,
  },

  signUpButton: {
    height: 40,
    width: 200,
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "dustismo",
  },

  signUpButtonText: {
    fontSize: 18,
    fontFamily: "dustismo",
  },
});