import React, { useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TextButton,
} from "../components/Themed";
import { ActivityIndicator } from "../components/ActitivityIndicator";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as yup from "yup";

import { navigate } from "../navigation/navigatorRef";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export default () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignClick = async (values: any) => {
    const { username, password } = values;
    /*try {
      setIsLoading(true);
      const res = await api.post("/auth/login", {
        user: { username, password },
      });
      const accessToken = res.data.access_token;
      await AsyncStorage.setItem("@Cronoz:accessToken", accessToken);
      await AsyncStorage.setItem(
        "@Cronoz:refreshToken",
        res.data.refresh_token
      );
      navigation.navigate("TabNavigator");
    } catch (err) {
      let msg = "Não foi possível realizar o login";
      msg = err.response.data.message || msg;
      Alert.alert("Erro", msg);
    }
    finally {
      setIsLoading(false);
    }*/
    navigation.navigate("TabNavigator");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator/>}
      <Image
        style={styles.logo}
        source={{ uri: "https://i.imgur.com/EBPBJTM.png" }}
      />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSignClick}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={TextInput}
              name="username"
              placeholder="Digite seu login"
              style={styles.loginInput}
              containerStyle={styles.loginBar}
              icon={{
                name: "ios-mail",
                size: 18,
                color: Colors[colorScheme].tint,
              }}
            />
            <Field
              component={TextInput}
              name="password"
              placeholder="Digite sua senha"
              secureTextEntry={true}
              style={styles.loginInput}
              containerStyle={styles.loginBar}
              icon={{
                name: "ios-lock-closed",
                size: 18,
                color: Colors[colorScheme].tint,
              }}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit as (values: any) => void}
              disabled={!isValid}
            >
              <TextButton style={styles.loginButtonText}>Entrar</TextButton>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text style={[styles.signText, { color: Colors[colorScheme].tint }]}>
        Ainda não tem uma conta por aqui?
      </Text>
      <TouchableOpacity
        style={styles.signButton}
        onPress={handleSignUp}
      >
        <Text style={styles.signButtonText}>Cadastre-se agora!</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 290,
    height: 90,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  loginArea: {
    justifyContent: "center",
    alignItems: "center",
  },

  loginInput: {
    fontFamily: "dustismo",
    fontSize: 16,
  },

  loginBar: {
    marginTop: 15,
    borderRadius: 15,
    height: 45,
    marginHorizontal: 30,
  },

  loginButton: {
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "dustismo",
    alignSelf: "stretch",
    marginHorizontal: 30,
  },

  loginButtonText: {
    fontSize: 20,
    fontFamily: "dustismo",
  },

  signText: {
    marginTop: 50,
    fontSize: 15,
    fontFamily: "dustismo",
  },

  signTextBold: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 16,
    fontFamily: "dustismo",
  },

  signButton: {
    height: 40,
    width: 200,
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },

  signButtonText: {
    fontFamily: "dustismo",
    fontSize: 16,
    fontWeight: "bold"
  },
});
