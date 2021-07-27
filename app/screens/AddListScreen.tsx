import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity as DateInputButton,
  Alert,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import {
  View,
  Text,
  TextInput,
  InputLabel,
  Title,
  TouchableOpacity,
  TextButton,
  CancelButton,
} from "../components/Themed";
import api from "../services/api";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ActivityIndicator } from "../components/ActitivityIndicator";
import { Ionicons as Icon } from "@expo/vector-icons";

import DateTimePicker, { Event } from "@react-native-community/datetimepicker";


const signUpValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, ({ min }) => `O título deve ter pelo menos ${min} caracteres`)
    .required("Campo obrigatório"),
  description: yup
  	.string()
		.max(10, ({ max }) => `A descrição deve ter no máximo ${max} caracteres`),
});

export default () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  //const [listItem, setListItem] = useState<ListItem[]>([]);

  const listItem = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item",
  }
];

  const [date, setDate] = useState(new Date(Date.now()));
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (values: any) => {
    const { title, description } = values;
    try {
      setIsLoading(true);
      const res = await api.post("/task", {
        task: {
          title,
          date,
          description,
        },
      });
      navigation.goBack();
    } catch (err) {
      let msg = "Houve um erro";
      msg = err.response.data.message || msg;
      Alert.alert("Erro", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onDateChange = (event: Event, date?: Date | undefined) => {
    setDate(date!);
    if (showDate) {
      setShowDate(false);
      showTimepicker();
    } else if (Platform.OS === "android") {
      setShowTime(false);
    }
  };

  const onDateChangeAndroid = (event: Event, date?: Date | undefined) => {
    if (date !== undefined) {
      setDate(date);
      if (showDate) {
        setShowDate(false);
        showTimepicker();
        setShowTime(false);
      }
      if (Platform.OS === "android" && showTime) {
        setShowTime(false);
      }
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const showTimepicker = () => {
    setShowTime(true);
  };

  // Inputs são diferentes em iOS e Android
  const datetimeInput =
    Platform.OS === "ios" ? (
      <>
        <InputLabel>Conclusão</InputLabel>
        <View
          style={styles.iosDateInput}
        >
          <DateTimePicker
            testID="datePicker"
            mode="date"
            value={date}
            display="compact"
            onChange={onDateChange}
            style={{ width: "40%" }}
          />
          <DateTimePicker
            testID="timePicker"
            mode="time"
            value={date}
            display="compact"
            onChange={onDateChange}
            style={{ width: "20%" }}
          />
        </View>
      </>
    ) : (
      <>
        <DateInputButton
          onPress={showDatepicker}
          style={[
            styles.dateInputBar,
            { backgroundColor: Colors[colorScheme].inputBackgroundColor },
          ]}
        >
          <Icon
            name="ios-time"
            size={20}
            color={Colors[colorScheme].tint}
          />
          <Text style={styles.dateInput}>
            {date.getHours()}:{date.getMinutes()} {date.getDate()}/
            {date.getMonth()+1}/{date.getFullYear()}
          </Text>
        </DateInputButton>

        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="date"
            value={date}
            is24Hour={true}
            display="default"
            onChange={onDateChangeAndroid}
          />
        )}

        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="time"
            value={date}
            is24Hour={true}
            display="default"
            onChange={onDateChangeAndroid}
          />
        )}
      </>
    );

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors[colorScheme].background }}
    >
      {isLoading && <ActivityIndicator />}
      <CancelButton />
      <View style={styles.container}>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            title: "",
            description: "",
            items: null,
          }}
          onSubmit={handleSave}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field
                component={TextInput}
                name="title"
                placeholder="Título da lista"
                style={styles.titleInput}
                containerStyle={styles.titleInputBar}
                icon={{
                  name: "ios-list",
                  size: 25,
                  color: Colors[colorScheme].tint,
                }}
              />

              {datetimeInput}

							{datetimeInput}

              <Field
                component={TextInput}
                name="items"
                placeholder="Adicionar itens"
                style={styles.itemInput}
                containerStyle={styles.itemInputBar}
                icon={{
                  name: "ios-add-circle",
                  size: 20,
                  color: Colors[colorScheme].tint,
                }}
              />

              {listItem.map((listItem) => (
                <Text key={listItem.id} style={styles.listItems} >{listItem.name}</Text> 
              ))}

              <Field
                component={TextInput}
                name="description"
                placeholder="Adicionar descrição"
                style={styles.descriptionInput}
                containerStyle={styles.descriptionInputBar}
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit as (values: any) => void}
                disabled={!isValid}
              >
                <TextButton style={styles.saveButtonText}>Salvar</TextButton>
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

  titleInput: {
    fontWeight: "bold",
    fontSize: 20,
  },

  titleInputBar: {
    marginTop: 25,
    height: 60,
  },

  iosDateInput: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 10,
  },

  dateInput: {
    marginLeft: 10,
    fontFamily: "dustismo",
    fontSize: 15,
  },

  dateInputBar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 15,
    borderColor: "transparent",
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 15,
  },

  descriptionInput: {
    textAlign: "left",
    fontSize: 14,
    marginTop: 5,
    padding: 5,
  },

  descriptionInputBar: {
    alignItems: "flex-start",
    marginTop: 15,
    height: 120,
  },

  itemInput: {
    fontSize: 15,
  },

  itemInputBar: {
    marginTop: 15,
    height: 50,
  },

  listItems: {
    fontFamily: "dustismo",
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 25,
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

  saveButtonText: {
    fontSize: 18,
    fontFamily: "dustismo",
  },

});
