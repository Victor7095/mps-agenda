import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Title, View, ItemBox } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { Ionicons as Icon } from "@expo/vector-icons";

import api from "../services/api";

interface Meeting {
  id: number;
  title: string;
  category: string;
  date: string;
  place: string;
  link: string;
  description: string;
  guests_count: number;
}

export default function TabListScreen({navigation} : any) {
  const colorScheme = useColorScheme();

  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      fetchMeetings();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meeting/find_by_user");
      const newMeetings = res.data.meetings;
      setMeetings(newMeetings);
      console.log(newMeetings);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.superiorAlign}>
        <Title style={styles.title}>Suas reuniões</Title>

        {meetings.map((meeting) => (
          <ItemBox
            key={meeting.id}
            title={meeting.title}
            begin={meeting.date}
            end={null}
            description={`${meeting.guests_count} Pessoas`}
            onVisitButtonPress={() => navigation.navigate("TabNavigator")}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMeetScreen")}
      >
        <Icon name="add-circle" color="#fb3c44" size={60} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  superiorAlign: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },

  addButton: {
    alignSelf: "flex-end",
    marginBottom: 5,
    marginRight: 5,
  },
});
