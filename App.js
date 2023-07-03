import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { PointsProvider } from "./PointsContext";

import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import EasyLevelsScreen from "./EasyLevels";
import CrosswordApp from "./CrosswordScreen";
import LevelScreen from "./LevelScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PointsProvider>
      <NavigationContainer>
        <StatusBar hidden></StatusBar>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="EasyLevels" component={EasyLevelsScreen} />
          <Stack.Screen name="LevelScreen" component={LevelScreen} />
          <Stack.Screen name="CrosswordScreen" component={CrosswordApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </PointsProvider>
  );
};

export default App;
