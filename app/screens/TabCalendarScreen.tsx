import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons as Icon } from "@expo/vector-icons";

import { Calendar, LocaleConfig } from 'react-native-calendars';

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";


export default function TabCalendarScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abril','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'br';

  return (
    <View style={styles.container}>

      <View style={styles.superiorButtons}>
        <TouchableOpacity onPress={() => navigation.navigate("AccountScreen")}>
          <Icon name='ios-person' color={Colors[colorScheme].tint} size={30}/>
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={{ uri: "https://i.imgur.com/EBPBJTM.png" }}
        />

        <TouchableOpacity>
          <Icon name='ios-notifications' color={Colors[colorScheme].tint} size={30}/>
        </TouchableOpacity>
      </View>

      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: Colors[colorScheme].inputBackgroundColor,
          arrowColor: '#fb3c44',
          dayTextColor: Colors[colorScheme].tint,
          textDisabledColor: 'gray',
          todayTextColor: '#fb3c44',
          selectedDayBackgroundColor: '#fb3c44',
          selectedDayTextColor: 'white',
          textSectionTitleColor: '#fb3c44',
          monthTextColor: Colors[colorScheme].tint,
          textDayFontFamily: 'dustismo',
          textDayFontSize: 18,
          textMonthFontFamily: 'dustismo',
          textMonthFontSize: 20,
          textMonthFontWeight: 'bold',
          textDayHeaderFontFamily: 'dustismo',
          textDayHeaderFontSize: 16
        }}
      >
      </Calendar>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  superiorButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 10
  },

  logo: {
    width: 150,
    height: 45,
    marginTop: 5,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  calendar: {
    width: 350,
    alignSelf: 'stretch',
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});
