import React, { useEffect, useContext } from "react";
//import { Container, LoadingIcon } from './styles';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

//import { UserContext } from '../../contexts/UserContext';

//import Api from '../../Api';

export default () => {
  //const { dispach: userDispach } = useContext(UserContext);

  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // checagem de token
    AsyncStorage.getItem("@RangoLegal:accessToken")
      .then((res) => {
        const decoded: any = jwt_decode(res!);
        navigation.navigate("TabNavigator");
      })
      .catch((err) => {
        navigation.navigate("Login"); // se não há token salvo, vai para a tela de login
      });
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Image
        style={styles.logo}
        source={{ uri: "https://i.imgur.com/EBPBJTM.png" }}
      />
      <ActivityIndicator
        size="large"
        color={Colors[colorScheme].tint}
        style={{ marginTop: 50 }}
      />
    </SafeAreaView>
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
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
