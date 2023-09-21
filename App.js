import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Expo libraries
import { Asset } from "expo-asset";
import * as Font from "expo-font";

// Context files
import {
  SoundSettingProvider,
  MusicSettingProvider,
  VibrationSettingProvider,
} from "./SoundSettingContext";
import { PointsProvider } from "./PointsContext";
import { CreditsProvider } from "./CreditsContext";

// Username
import { initializeUsername } from "./UserNameManager";

// Background image
import { setDefaultBackgroundImage } from "./BackgroundManager";

// Screens
import LoadingScreen from "./Screens/LoadingScreen";
import HomeScreen from "./Screens/HomeScreen";
import GameScreen from "./Screens/GameScreen";
import EasyLevelsScreen from "./Levels/EasyLevels";
import MediumLevelsScreen from "./Levels/MediumLevels";
import HardLevelsScreen from "./Levels/HardLevels";
import ThemedLevelsScreen from "./Levels/ThemedLevels";
import TestingGamingScreen from "./TestingGamingScreen";
import CrosswordApp from "./Screens/CrosswordScreen";
import LevelScreen from "./Screens/LevelScreen";
import Achievements from "./Achievements";
import UserProfile from "./Screens/UserProfileScreen";
import Leaderboard from "./Screens/LeaderboardScreen";

const Stack = createStackNavigator();
const paths = [
  require("./assets/loadingImage.png"),
  require("./assets/medal1.png"),
  require("./assets/medal2.png"),
  require("./assets/medal3.png"),
  require("./assets/LevelDifficultyImages/star-easy.png"),
  require("./assets/LevelDifficultyImages/star-medium.png"),
  require("./assets/LevelDifficultyImages/star-hard.png"),
  require("./assets/LevelDifficultyImages/star-themed.png"),
  require("./assets/credits.png"),
  require("./assets/BackgroundImages/1.png"),
  require("./assets/BackgroundImages/2.png"),
  require("./assets/BackgroundImages/3.png"),
  require("./assets/BackgroundImages/4.png"),
  require("./assets/BackgroundImages/5.png"),
  require("./assets/BackgroundImages/6.png"),
  require("./assets/BackgroundImages/7.png"),
  require("./assets/BackgroundImages/8.png"),
  require("./assets/BackgroundImages/9.png"),
  require("./assets/BackgroundImages/10.png"),
  require("./assets/BackgroundImages/11.png"),
  require("./assets/BackgroundImages/12.png"),
  require("./assets/BackgroundImages/13.png"),
  require("./assets/BackgroundImages/14.png"),
  require("./assets/BackgroundImages/15.png"),
  require("./assets/BackgroundImages/16.png"),
  require("./assets/BackgroundImages/17.png"),
  // Hints
  require("./assets/hint1-mag-glass.png"),
  require("./assets/hint2-bulb.png"),
  require("./assets/hint3-dice.png"),
  // Music files
  require("./assets/sounds/backgroundMusic.mp3"),
  require("./assets/sounds/buttonClick.mp3"),
  require("./assets/sounds/levelCompleted.mp3"),
];

export default function App() {
  // Hooks needed for the loading screen and fonts
  const [fontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cache all images on app startup
  // Written with a help of ChatGPT - start
  const cacheImages = async (paths) => {
    await Promise.all(
      paths.map(async (path) => {
        await Asset.fromModule(path).downloadAsync();
      })
    );
  };
  // Written with a help of ChatGPT - end

  // Load the fonts that will be used within the app
  const loadFonts = async () => {
    await Font.loadAsync({
      AppFont: require("./assets/fonts/Quicksand-Regular.ttf"),
      AppFontBold: require("./assets/fonts/Quicksand-Bold.ttf"),
      AppLoadingAmaticBold: require("./assets/fonts/AmaticSC-Bold.ttf"),
    });
    setFontLoaded(true);
  };

  // Close the loading screen after x seconds
  // better to this way to make sure everyting is loaded properly
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    // Cache all declared images
    cacheImages(paths);
    // If the user logs in for the first time apply generated username
    initializeUsername();
    // Initialise the default background image if not already set
    setDefaultBackgroundImage();
    // Initialise fonts
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
              <VibrationSettingProvider>
                <StatusBar hidden></StatusBar>
                {/* Hide system header for all of the screens */}
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  {/* When loading variable is true display LoadingScreen, otherwise display home screen */}
                  {loading ? (
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                  ) : (
                    <Stack.Screen name="Home" component={HomeScreen} />
                  )}
                  <Stack.Screen name="GameScreen" component={GameScreen} />
                  <Stack.Screen name="UserProfile" component={UserProfile} />
                  <Stack.Screen name="Leaderboard" component={Leaderboard} />
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
