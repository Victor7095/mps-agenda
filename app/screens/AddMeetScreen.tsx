import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity as DefaultTouchableOpacity,
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
  observations: yup
    .string()
    .max(10, ({ max }) => `A descrição deve ter no máximo ${max} caracteres`),
});

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (values: any) => {
    const { title, people, place, link, observations } = values;
    try {
      setIsLoading(true);
      const res = await api.post("/meeting", {
        meeting: {
          title,
          date,
          category: title,
          place,
          link,
          observations,
          users: selectedUsers
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

  const searchUsers = async (val: string) => {
    try {
      const res = await api.get("/user/search", { params: { name: val } });
      setSuggestedUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  // Inputs são diferentes em iOS e Android
  const datetimeInput =
    Platform.OS === "ios" ? (
      <>
        <InputLabel>Quando</InputLabel>
        <View style={styles.iosDateInput}>
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
        <DefaultTouchableOpacity
          onPress={showDatepicker}
          style={[
            styles.dateInputBar,
            { backgroundColor: Colors[colorScheme].inputBackgroundColor },
          ]}
        >
          <Icon name="ios-time" size={20} color={Colors[colorScheme].tint} />
          <Text style={styles.dateInput}>
            {date.getHours()}:{date.getMinutes()} {date.getDate()}/
            {date.getMonth() + 1}/{date.getFullYear()}
          </Text>
        </DefaultTouchableOpacity>

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

  const addUser = (user: User) => {
    const idx = selectedUsers.findIndex((u) => u.id === user.id);
    if (idx === -1) setSelectedUsers([...selectedUsers, user]);
  };

  const removeUser = (user: User) => {
    const idx = selectedUsers.findIndex((u) => u.id === user.id);
    const users = [...selectedUsers];
    users.splice(idx, 1);
    setSelectedUsers(users);
  };

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
            observations: "",
            people: "",
            place: "",
            link: "",
          }}
          onSubmit={handleSave}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field
                component={TextInput}
                name="title"
                placeholder="Título da reunião"
                style={styles.titleInput}
                containerStyle={styles.titleInputBar}
                icon={{
                  name: "ios-people",
                  size: 25,
                  color: Colors[colorScheme].tint,
                }}
              />

              {datetimeInput}

              <Field
                component={TextInput}
                name="people"
                placeholder="Adicionar pessoas"
                style={styles.itemInput}
                containerStyle={styles.itemInputBar}
                onChangeText={searchUsers}
                icon={{
                  name: "ios-add-circle",
                  size: 20,
                  color: Colors[colorScheme].tint,
                }}
              />
              <View style={styles.selectedUsersContainer}>
                {selectedUsers.map((user) => (
                  <DefaultTouchableOpacity
                    key={user.id}
                    style={styles.selectedUsers}
                    onPress={() => removeUser(user)}
                  >
                    <Text>{user.username}</Text>
                  </DefaultTouchableOpacity>
                ))}
              </View>
              {suggestedUsers.map((user) => (
                <DefaultTouchableOpacity
                  key={user.id}
                  style={styles.suggestedUsers}
                  onPress={() => addUser(user)}
                >
                  <Text>
                    {user.name} - {user.username}
                  </Text>
                </DefaultTouchableOpacity>
              ))}

              <Field
                component={TextInput}
                name="place"
                placeholder="Adicionar local"
                style={styles.itemInput}
                containerStyle={styles.itemInputBar}
                icon={{
                  name: "ios-location",
                  size: 20,
                  color: Colors[colorScheme].tint,
                }}
              />

              <Field
                component={TextInput}
                name="link"
                placeholder="Link da reunião"
                style={styles.itemInput}
                containerStyle={styles.itemInputBar}
                icon={{
                  name: "ios-link",
                  size: 20,
                  color: Colors[colorScheme].tint,
                }}
              />

              <Field
                component={TextInput}
                name="observations"
                placeholder="Adicionar descrição"
                style={styles.observationsInput}
                containerStyle={styles.observationsInputBar}
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

  observationsInput: {
    textAlign: "left",
    fontSize: 14,
    marginTop: 5,
    padding: 5,
  },

  observationsInputBar: {
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
  selectedUsersContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  selectedUsers: {
    fontFamily: "dustismo",
    fontSize: 15,
    alignSelf: "flex-start",
    borderRadius: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    marginRight: 5,
  },

  suggestedUsers: {
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
