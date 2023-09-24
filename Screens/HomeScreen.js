import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
// https://github.com/oblador/react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsOverlay from "../SettingsOverlay";
import { LinearGradient } from "expo-linear-gradient";
import { PointsContext } from "../PointsContext";
import { useButtonClickSound, useBackgroundSound } from "../SoundManager";
import {
  getBackgroundImage,
  backgroundImagePaths,
  DEFAULT_BACKGROUND,
} from "../BackgroundManager";

// Get the height of the device
// https://reactnative.dev/docs/dimensions
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  // Initialise the background music
  const { loadBackgroundSound } = useBackgroundSound();
  // Import points info
  const { points } = useContext(PointsContext);

  // Initialize animation value
  const crownIconColorAnimation = new Animated.Value(0);

  // Initialize settings overlay value
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Set the default background in case something brakes
  const [backgroundImageSource, setBackgroundImageSource] = useState(
    backgroundImagePaths[DEFAULT_BACKGROUND]
  );

  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  // Change the position of the playButton depending on the windowHeight
  let playButtonPosition = windowHeight / 2.5;

  // Load the background image number when the screen gains focus
  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    React.useCallback(() => {
      getBackgroundImage().then((imageNumber) => {
        const selectedImage = backgroundImagePaths[imageNumber];
        setBackgroundImageSource(selectedImage);
      });
    }, [])
  );

  // Declare navigation buttons
  const handlePlayButtonPress = () => {
    navigation.navigate("GameScreen");
  };
  const handleUserButtonPress = () => {
    navigation.navigate("UserProfile");
  };
  const handleTrophyButtonPress = () => {
    navigation.navigate("Achievements");
  };
  const handleLeaderboardButtonPress = () => {
    navigation.navigate("Leaderboard");
  };

  // Declare the settings hiding/showing
  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };
  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  // ---***---
  // Animation for the playButton
  // It consist of two animations
  //  1. Firstly the buttons slides from the left side of the screen
  //  2. Secondly, the button "pulsates" repeatedly
  // Written with a help of ChatGPT - start
  const [animation] = useState(new Animated.Value(-400)); // Initial position outside the screen
  const [scaleAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    // First Animation: Translate the button from left to the middle
    const translateAnimation = Animated.timing(animation, {
      toValue: 0, // Final position at the center of the screen
      duration: 800, // Animation duration in milliseconds
      useNativeDriver: true,
    });

    // Second Animation: Pulsating effect by scaling the button
    const increaseAnimation = Animated.timing(scaleAnimation, {
      toValue: 1.2, // Increase the scale to 1.2
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true,
    });

    const decreaseAnimation = Animated.timing(scaleAnimation, {
      toValue: 1, // Decrease the scale back to 1
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true,
    });

    // Loop the second animation every x seconds
    const scaleAnimationSequence = Animated.sequence([
      increaseAnimation,
      decreaseAnimation,
      Animated.delay(5000), // Wait for 5 seconds
    ]);

    const scaleAnimationLoop = Animated.loop(scaleAnimationSequence);

    // Run both animations simultaneously
    Animated.parallel([translateAnimation, scaleAnimationLoop]).start();

    return () => {
      scaleAnimationLoop.stop(); // Stop the scale animation loop when component unmounts
    };
  }, []);
  // Written with a help of ChatGPT - end

  // Crown animation for the points box
  // https://reactnative.dev/docs/animated
  const startCrownIconColorAnimation = () => {
    Animated.loop(
      Animated.timing(crownIconColorAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();
  };

  useEffect(() => {
    // Start the animation when screen mounts
    startCrownIconColorAnimation();
  });

  return (
    // Display the backgroundImage
    <ImageBackground
      source={backgroundImageSource}
      style={styles.backgroundImage}
    >
      <View style={styles.container} testID="homescreen-container">
        {/* Display buttons at the top */}
        <View style={styles.buttonContainer}>
          {/* User Profile Button */}
          <TouchableOpacity
            testID="user-profile-button"
            style={styles.button}
            onPress={() => {
              handleButtonSoundPlay();
              handleUserButtonPress();
            }}
          >
            <Icon name="user" style={styles.buttonIcon} solid />
          </TouchableOpacity>

          {/* Achievements Button */}
          <TouchableOpacity
            testID="achivs-button"
            style={styles.button}
            onPress={() => {
              handleButtonSoundPlay();
              handleTrophyButtonPress();
            }}
          >
            <Icon name="trophy" style={styles.buttonIcon} />
          </TouchableOpacity>
          {/* Settings Button */}
          <TouchableOpacity
            testID="settings-button"
            style={styles.button}
            onPress={() => {
              handleButtonSoundPlay();
              handleSettingsButtonPress();
            }}
          >
            <SettingsOverlay
              visible={settingsVisible}
              onClose={handleCloseSettings}
            />
            <Icon name="cog" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
        {/* Leaderboard button */}
        <TouchableOpacity
          testID="leaderboard-button"
          style={styles.scoreContainer}
          onPress={() => {
            handleButtonSoundPlay();
            handleLeaderboardButtonPress();
          }}
        >
          {/* Animate the background for the crown icon */}
          {/* Written with a help of ChatGPT - start */}
          <Animated.View
            style={[
              styles.buttonLeaderBoard,
              {
                backgroundColor: crownIconColorAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [
                    "rgba(183,137,95,0.93)",
                    "rgba(213,203,47,0.93)",
                    "rgba(183,137,95,0.93)",
                  ],
                }),
              },
            ]}
          >
            <Icon name="crown" style={styles.buttonIcon} />
          </Animated.View>
          <Text style={styles.scoreText}>Your points</Text>
          <Text style={styles.scoreTextValue}>{points}</Text>
        </TouchableOpacity>
        {/* Animate the play button */}
        <Animated.View>
          <TouchableOpacity
            testID="play-button"
            onPress={() => {
              handlePlayButtonPress();
              handleButtonSoundPlay();
            }}
            style={[
              styles.playButton,
              { top: playButtonPosition },
              {
                transform: [
                  { translateX: animation },
                  { scale: scaleAnimation },
                ],
              },
            ]}
          >
            {/* Apply gradient colours for the Play Button */}
            <LinearGradient
              colors={["rgba(112,212,79,1)", "rgba(55,111,38,1)"]} // Specify your gradient colors
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.playButtonGradient}
            >
              <Text style={styles.playButtonText}>Play</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        {/* Written with a help of ChatGPT - end */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: windowHeight * 0.05,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: windowHeight * 0.08,
    padding: 12,
    backgroundColor: "rgba(69,84,62,1)",
    borderRadius: 20,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  buttonLeaderBoard: {
    position: "absolute",
    alignItems: "center",
    top: -15,
    right: -15,
    padding: windowHeight * 0.012,
    backgroundColor: "rgba(183,137,95,1)",
    borderRadius: 100,
    transform: [{ rotate: "15deg" }],
  },
  buttonIcon: {
    justifyContent: "center",
    color: "white",
    fontSize: windowHeight * 0.03,
    borderRadius: 100,
  },
  scoreContainer: {
    width: "50%",
    backgroundColor: "rgba(47,57,44,0.8)",
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  scoreText: {
    alignSelf: "center",
    fontSize: 26,
    color: "white",
    fontFamily: "AppFont",
  },
  scoreTextValue: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
    fontFamily: "AppFontBold",
  },
  playButton: {
    paddingHorizontal: 130,
    paddingVertical: 50,
    borderRadius: 40,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  playButtonGradient: {
    ...StyleSheet.absoluteFill,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  playButtonText: {
    fontSize: 60,
    fontFamily: "AppLoadingAmaticBold",
    color: "#fff",
  },
  playButtonContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: 30,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
