import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StartScreen } from "../screens";

const Stack = createNativeStackNavigator();

export default (
  <Stack.Group key={"start.routes"}>
    <Stack.Screen
      name="/start"
      component={StartScreen}
      options={{ header: () => null }}
    />
  </Stack.Group>
);
