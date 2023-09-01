import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { PointsProvider } from "./PointsContext";
import { CreditsProvider } from "./CreditsContext";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import {
  SoundSettingProvider,
  MusicSettingProvider,
} from "./SoundSettingContext";
// import { useBackgroundSound } from "./SoundManager";

// Screens
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import EasyLevelsScreen from "./EasyLevels";
import MediumLevelsScreen from "./MediumLevels";
import HardLevelsScreen from "./HardLevels";
import ThemedLevelsScreen from "./ThemedLevels";
import TestingGamingScreen from "./TestingGamingScreen";
import CrosswordApp from "./CrosswordScreen";
import LevelScreen from "./LevelScreen";
import Achievements from "./Achievements";

const Stack = createStackNavigator();

export default function App() {
  // Hooks needed for the loading screen and fonts
  // const [loading, setLoading] = useState(true);
  // useBackgroundSound();
  const [fontLoaded, setFontLoaded] = useState(false);
  // Close the loading screen after x seconds
  // setTimeout(() => {
  //   setLoading(false);
  // }, 2000);

  // Load the fonts that will be used within the app
  const loadFonts = async () => {
    await Font.loadAsync({
      AppFont: require("./assets/fonts/Quicksand-Regular.ttf"),
      AppFontBold: require("./assets/fonts/Quicksand-Bold.ttf"),
    });
    setFontLoaded(true);
  };

  // Cache the images
  // cacheImages();

  useEffect(() => {
    // Load fonts and sounds
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <PointsProvider>
      <CreditsProvider>
        <NavigationContainer>
          <SoundSettingProvider>
            <MusicSettingProvider>
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
                <Stack.Screen
                  name="MediumLevels"
                  component={MediumLevelsScreen}
                />
                <Stack.Screen name="HardLevels" component={HardLevelsScreen} />
                <Stack.Screen
                  name="ThemedLevels"
                  component={ThemedLevelsScreen}
                />
                {/* Testing screen  */}
                <Stack.Screen
                  name="TestingGamingScreen"
                  component={TestingGamingScreen}
                />
                <Stack.Screen name="LevelScreen" component={LevelScreen} />
                <Stack.Screen name="CrosswordScreen" component={CrosswordApp} />
                <Stack.Screen name="Achievements" component={Achievements} />
              </Stack.Navigator>
            </MusicSettingProvider>
          </SoundSettingProvider>
        </NavigationContainer>
      </CreditsProvider>
    </PointsProvider>
  );
}
