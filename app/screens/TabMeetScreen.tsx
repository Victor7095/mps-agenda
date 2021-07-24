import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, ItemBox } from '../components/Themed';

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { useNavigation } from "@react-navigation/native";
import { Ionicons as Icon } from "@expo/vector-icons";


export default function TabListScreen() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.superiorAlign}>
        <Text style={styles.title}>Suas reuniões</Text>
        
        <ItemBox
          title='Reunião da crise'
          begin='14:00 24/08/2012'
          end='-'
          details='3 pessoas'
          onVisitButtonPress={() => navigation.navigate("TabNavigator")}
        />
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Icon name="add-circle" color='#fb3c44' size={60} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  superiorAlign: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },

  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },

  addButton: {
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginRight: 5
  }
  
});
