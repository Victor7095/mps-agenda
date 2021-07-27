import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Title, View, ItemBox } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { useNavigation } from "@react-navigation/native";
import { Ionicons as Icon } from "@expo/vector-icons";

import api from "../services/api";

interface Task {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function TabTaskScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      fetchTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task/find_by_user");
      const newTasks = res.data.tasks;
      setTasks(newTasks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.superiorAlign}>
        <Title style={styles.title}>Suas tarefas</Title>

        {tasks.map((task) => (
          <ItemBox
            key={task.id}
            title={task.title}
            begin={task.date}
            end={task.date}
            description={task.description}
            onVisitButtonPress={() => navigation.navigate("TabNavigator")}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTaskScreen")}
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
