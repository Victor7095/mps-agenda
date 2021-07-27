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
	ItemBox,
	InvitationBox,
} from "../components/Themed";
//import api from "../../services/api";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ActivityIndicator } from "../components/ActitivityIndicator";
import { UserInterfaceIdiom } from "expo-constants";


export default function NotificationScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors[colorScheme].background }}
    >
      <CancelButton/>
      <View style={styles.container}>
        <Title style={styles.title}>Notificações</Title>

				<View style={styles.superiorAlign}>
					<InvitationBox
						owner="Chefe Legal"
						meetTitle="Retrospectiva"
						begin="01/01/1111"
						end="01/01/1111"
						onVisitButtonPress={() => navigation.navigate("TabNavigator")}
					/>

					<ItemBox
						key="1"
						title="reunião"
						begin="01/01/1111"
						end="01/01/1111"
						description="3 pessoas"
						onVisitButtonPress={() => navigation.navigate("TabNavigator")}
					/>
				</View>

      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

	superiorAlign: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
  },

});