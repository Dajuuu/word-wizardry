import React, { useState, useContext, useEffect } from "react";
import { PointsContext } from "./PointsContext";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
  Switch,
  ImageBackground,
} from "react-native";
import SettingsOverlay from "./SettingsOverlay";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useButtonClickSound } from "./SoundManager";
import { useBackgroundSound } from "./SoundManager";

const HomeScreen = ({ navigation }) => {
  const { loadBackgroundSound } = useBackgroundSound();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let iconWidth = windowWidth / 20;
  let playButtonPosition = windowHeight / 2.5;
  const { points } = useContext(PointsContext);

  // Initialize animation value
  const crownIconColorAnimation = new Animated.Value(0);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handlePlayButtonPress = () => {
    navigation.navigate("GameScreen");
  };

  const handleTrophyButtonPress = () => {
    navigation.navigate("Achievements");
  };

  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Animation
  const [animation] = useState(new Animated.Value(-400)); // Initial position outside the screen
  const [scaleAnimation] = useState(new Animated.Value(1)); // Initial scale value of 1

  useEffect(() => {
    // First Animation: Translate the button from left to the middle
    const translateAnimation = Animated.timing(animation, {
      toValue: 0, // Final position at the center of the screen
      duration: 800, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
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

    // const staticAnimation = Animated.timing(scaleAnimation, {
    //   toValue: 1, // Maintain scale at 1 for 5 seconds
    //   duration: 5000, // Static duration in milliseconds
    //   useNativeDriver: true,
    // });

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

  // Crown animation for the points box
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
    startCrownIconColorAnimation();
  });

  // const handleButtonSoundPlay = async () => {
  //   // Load the sound file
  //   const soundObject = new Audio.Sound();
  //   try {
  //     await soundObject.loadAsync(require("./assets/sounds/buttonClick.mp3"));
  //     soundObject.playAsync(); // Remove the 'await' keyword here
  //     // Additional logic for button click
  //     // ...
  //   } catch (error) {
  //     console.error("Error playing sound:", error);
  //   }
  // };
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  return (
    <ImageBackground
      source={require("./assets/BackgroundImages/2.png")} // Replace with your image source
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Display buttons at the top */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleButtonSoundPlay}
          >
            <Icon
              name="user"
              style={[styles.buttonIcon, { fontSize: iconWidth }]}
              solid
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleButtonSoundPlay();
              handleTrophyButtonPress();
            }}
          >
            <Icon
              name="trophy"
              style={[styles.buttonIcon, { fontSize: iconWidth }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
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
            <Icon
              name="cog"
              style={[styles.buttonIcon, { fontSize: iconWidth }]}
            />
          </TouchableOpacity>
        </View>
        {/* Points container */}
        <TouchableOpacity
          style={styles.scoreContainer}
          onPress={() => {
            handleButtonSoundPlay();
          }}
        >
          <Animated.View
            style={[
              styles.buttonLeaderBoard,
              {
                backgroundColor: crownIconColorAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [
                    "rgba(183,137,95,0.8)",
                    "rgba(213,203,47,0.8)",
                    "rgba(183,137,95,0.8)",
                  ], // Define the colors for the animation
                }),
              },
            ]}
          >
            <Icon
              name="crown"
              style={[styles.buttonIcon, { fontSize: iconWidth }]}
            />
          </Animated.View>
          <Text style={styles.scoreText}>Your points</Text>
          <Text style={styles.scoreTextValue}>{points}</Text>
        </TouchableOpacity>
        {/* animate the play button */}
        <Animated.View>
          <TouchableOpacity
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

        {/* Settings Overlay */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // You can adjust the resizeMode as needed
    // zIndex:
  },
  // Button container
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  button: {
    // backgroundColor: "transparent",

    // // paddingHorizontal: 12,
    // // paddingVertical: 8,
    // // borderRadius: 8,
    // width: "15%",
    //    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ccc",
    // borderRadius: 15,
    // padding: 10,
    width: 60,
    padding: 12,
    paddingHorizontal: 14,
    // backgroundColor: "#ebb381",
    // backgroundColor: "rgba(69,84,62,1)",
    backgroundColor: "rgba(69,84,62,1)",
    borderRadius: 20,
    // elevation: 4, // Android shadow
    // shadowColor: "#000", // iOS shadow
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },

  buttonLeaderBoard: {
    position: "absolute",
    // justifyContent: "center",
    alignItems: "center",
    top: -15,
    right: -15,
    // backgroundColor: "#ccc",
    // borderRadius: 15,
    // padding: 10,
    // width: 60,
    padding: 10,
    // paddingHorizontal: 1,
    // paddingVertical: 10,
    // backgroundColor: "#ebb381",
    backgroundColor: "rgba(183,137,95,1)",
    borderRadius: 20,
    // shadowColor: "rgba(0,0,0, .4)", // IOS
    // shadowOffset: { height: 1 }, // IOS
    // shadowOpacity: 1, // IOS
    // shadowRadius: 1, //IOS
    // elevation: 5, // Android
    transform: [{ rotate: "15deg" }],
  },
  buttonIcon: {
    justifyContent: "center",
    // color: "rgba(189,203,183,1)",
    color: "white",
  },

  // Score container
  scoreContainer: {
    width: "50%",
    backgroundColor: "rgba(47,57,44,0.8)",
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 20,
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
    // marginBottom: 20,
    // borderBlockColor: "rgba(71,150,46,1)",
    // borderWidth: 1,
    // top: 300,
    // alignItems: "center",
    // width: "70%",
    // height: "40%",
    elevation: 8, // Android shadow
    // shadowColor: "#000", // iOS shadow
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  playButtonGradient: {
    ...StyleSheet.absoluteFill,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // borderBlockColor: "rgba(71,150,46,1)",
    // borderWidth: 1,
  },
  playButtonText: {
    fontSize: 44,
    // fontWeight: "bold",
    fontFamily: "AppFontBold",
    // alignSelf: "center",
    color: "#fff",
  },
  settingsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
    flexDirection: "column", // Ensure switch labels and switches are stacked vertically
    // alignItems: "flex-start",
  },
  settingsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1, // Add flex: 1 to expand and push the switches to the right
  },

  switchLabel: {
    fontSize: 16,
  },
  switchPosition: {
    alignItems: "flex-end",
  },
  supportButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: "60%",
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },
  closeButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "AppFont",
    color: "#fff",
  },
  // playButtonContainer: {
  //   transform: [{ translateX: -100 }], // Initial position outside the screen
  // },
  // playButton: {
  //   backgroundColor: "green",
  //   paddingHorizontal: 40,
  //   paddingVertical: 20,
  //   borderRadius: 50,
  //   marginBottom: 20,
  //   top: 200,
  // },
  // playButtonText: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#fff",
  // },
  playButtonContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: 30,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
