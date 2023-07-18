import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { PointsProvider } from "./PointsContext";

import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import EasyLevelsScreen from "./EasyLevels";
import MediumLevelsScreen from "./MediumLevels";
import CrosswordApp from "./CrosswordScreen";
import LevelScreen from "./LevelScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PointsProvider>
      <NavigationContainer>
        <StatusBar hidden></StatusBar>
        {/* Hide system header for all of the screens */}
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="EasyLevels" component={EasyLevelsScreen} />
          <Stack.Screen name="MediumLevels" component={MediumLevelsScreen} />
          <Stack.Screen name="LevelScreen" component={LevelScreen} />
          <Stack.Screen name="CrosswordScreen" component={CrosswordApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </PointsProvider>
  );
};

export default App;
