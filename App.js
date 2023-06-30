import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import EasyLevelsScreen from "./EasyLevels";
import CrosswordApp from "./CrosswordScreen";
import LevelScreen from "./LevelScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="EasyLevels" component={EasyLevelsScreen} />
        <Stack.Screen name="LevelScreen" component={LevelScreen} />
        <Stack.Screen name="CrosswordScreen" component={CrosswordApp} />
      </Stack.Navigator>
      <StatusBar hidden></StatusBar>
    </NavigationContainer>
  );
};

export default App;
