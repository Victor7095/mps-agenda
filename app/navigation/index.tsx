/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { View, ColorSchemeName } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from './navigatorRef';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import MainStack from "../navigation/MainStack";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "stretch",
          paddingTop: insets.top,
          backgroundColor: Colors[colorScheme || "light"].background
        }}
      >
        <MainStack />
      </View>
    </NavigationContainer>
  );
}
