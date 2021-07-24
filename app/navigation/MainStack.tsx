import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../screens/Preload";
import Login from "../screens/Login";

import TabNavigator from "../navigation/TabNavigator";
import TabCalendarScreen from "../screens/TabCalendarScreen";
import TabListScreen from "../screens/TabListScreen";
import TabTaskScreen from "../screens/TabTaskScreen";
import TabMeetScreen from "../screens/TabMeetScreen";


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

    <Stack.Screen name="TabNavigator" component={TabNavigator} />

		<Stack.Screen name="TabCalendarScreen" component={TabCalendarScreen} />
		<Stack.Screen name="TabListScreen" component={TabListScreen} />
		<Stack.Screen name="TabTaskScreen" component={TabTaskScreen} />
		<Stack.Screen name="TabMeetScreen" component={TabMeetScreen} />

  </Stack.Navigator>
);
