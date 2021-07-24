import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabCalendarScreen from "../screens/TabCalendarScreen";
import TabListScreen from "../screens/TabListScreen";
import TabTaskScreen from "../screens/TabTaskScreen";
import TabMeetScreen from "../screens/TabMeetScreen";

import { View } from "react-native";

const BottomTab = createBottomTabNavigator();

export default function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        style: { backgroundColor: Colors[colorScheme].tabBarBackgroundColor, borderTopWidth: 0 },
        labelPosition: "below-icon",
        labelStyle: { fontSize: 13, fontFamily: "dustismo" },
      }}
    >
      <BottomTab.Screen
        name="Calendar"
        component={TabCalendarScreen}
        options={{
          tabBarLabel: "Calendário",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-calendar" : "ios-calendar-outline"}
              color={color}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="List"
        component={TabListScreen}
        options={{
          tabBarLabel: "Listas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-list" : "ios-list-outline"}
              color={color}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Task"
        component={TabTaskScreen}
        options={{
          tabBarLabel: "Tarefas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-create" : "ios-create-outline"}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Meet"
        component={TabMeetScreen}
        options={{
          tabBarLabel: "Reuniões",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-people" : "ios-people-outline"}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={27} style={{ marginBottom: -3 }} {...props} />;
}

