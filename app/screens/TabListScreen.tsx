import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Title, View, ItemBox } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { useNavigation } from "@react-navigation/native";
import { Ionicons as Icon } from "@expo/vector-icons";

import api from "../services/api";

interface List {
  id: number;
  title: string;
  date: string;
}

export default function TabListScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      fetchLists();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchLists = async () => {
    try {
      const res = await api.get("/list/find_by_user");
      const newLists = res.data.lists;
      setLists(newLists);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.superiorAlign}>
        <Title style={styles.title}>Suas listas</Title>

        {lists.map((list) => (
          <ItemBox
            key={list.id}
            title={list.title}
            begin={list.date}
            end={list.date}
            description="3 itens"
            onVisitButtonPress={() => navigation.navigate("TabNavigator")}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddListScreen")}
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
