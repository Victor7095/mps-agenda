import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../screens/Preload";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

import TabNavigator from "../navigation/TabNavigator";
import TabCalendarScreen from "../screens/TabCalendarScreen";
import TabListScreen from "../screens/TabListScreen";
import TabTaskScreen from "../screens/TabTaskScreen";
import TabMeetScreen from "../screens/TabMeetScreen";

import AddTaskScreen from "../screens/AddTaskScreen";
import AddListScreen from "../screens/AddListScreen";
import AddMeetScreen from "../screens/AddMeetScreen";

import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";


const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />

    <Stack.Screen name="TabNavigator" component={TabNavigator} />
		<Stack.Screen name="TabCalendarScreen" component={TabCalendarScreen} />
		<Stack.Screen name="TabListScreen" component={TabListScreen} />
		<Stack.Screen name="TabTaskScreen" component={TabTaskScreen} />
		<Stack.Screen name="TabMeetScreen" component={TabMeetScreen} />

    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    <Stack.Screen name="AddListScreen" component={AddListScreen} />
    <Stack.Screen name="AddMeetScreen" component={AddMeetScreen} />

    <Stack.Screen name="AccountScreen" component={AccountScreen} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

  </Stack.Navigator>
);
