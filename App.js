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
  VibrationSettingProvider,
} from "./SoundSettingContext";
// import { useBackgroundSound } from "./SoundManager";
import { initializeUsername, checkUsernameInStorage } from "./UserNameManager";
import {
  BackgroundProvider,
  setDefaultBackgroundImage,
} from "./BackgroundManager"; // Import the necessary functions

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
import UserProfile from "./UserProfile";

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
  // Example usage

  const [username, setUsername] = useState("");

  useEffect(() => {
    const initializeUser = async () => {
      const user = await initializeUsername();
      setUsername(user);
    };

    initializeUser();
  }, []);
  useEffect(() => {
    // Initialize the default background image if not already set
    setDefaultBackgroundImage();
  }, []); // Empty dependency array to run this effect only once at app startup
  // You can also use checkUsernameInStorage elsewhere in your app

  const paths = [
    require("./assets/LevelDifficultyImages/star-easy.png"),
    require("./assets/LevelDifficultyImages/star-medium.png"),
    require("./assets/LevelDifficultyImages/star-hard.png"),
    require("./assets/LevelDifficultyImages/star-themed.png"),
    require("./assets/credits.png"),
    require("./assets/BackgroundImages/1.png"),
    require("./assets/BackgroundImages/2.png"),
    // Hints
    require("./assets/hint1-mag-glass.png"),
    require("./assets/hint2-bulb.png"),
    require("./assets/hint3-dice.png"),
    // Music files
    require("./assets/sounds/backgroundMusic.mp3"),
    require("./assets/sounds/buttonClick.mp3"),
    require("./assets/sounds/levelCompleted.mp3"),
    // Add more image paths as needed
  ];

  const cacheImages = async (paths) => {
    await Promise.all(
      paths.map(async (path) => {
        await Asset.fromModule(path).downloadAsync();
      })
    );
  };

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
    cacheImages(paths);
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
              <VibrationSettingProvider>
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
                  <Stack.Screen name="UserProfile" component={UserProfile} />
                  <Stack.Screen
                    name="EasyLevels"
                    component={EasyLevelsScreen}
                  />
                  <Stack.Screen
                    name="MediumLevels"
                    component={MediumLevelsScreen}
                  />
                  <Stack.Screen
                    name="HardLevels"
                    component={HardLevelsScreen}
                  />
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
                  <Stack.Screen
                    name="CrosswordScreen"
                    component={CrosswordApp}
                  />
                  <Stack.Screen name="Achievements" component={Achievements} />
                </Stack.Navigator>
              </VibrationSettingProvider>
            </MusicSettingProvider>
          </SoundSettingProvider>
        </NavigationContainer>
      </CreditsProvider>
    </PointsProvider>
  );
}
