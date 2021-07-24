import * as React from "react";
import {
  ActivityIndicator as DefaultActivityIndicator
} from "react-native";
import { View } from "./Themed";

export function ActivityIndicator(props: any) {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10,
      }}
    >
      <DefaultActivityIndicator {...props} />
    </View>
  );
}
