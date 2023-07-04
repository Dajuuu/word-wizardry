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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const HomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let iconWidth = windowWidth / 20;
  let playButtonPosition = windowHeight / 2.5;
  const { points } = useContext(PointsContext);

  const [settingsVisible, setSettingsVisible] = useState(false);

  const handlePlayButtonPress = () => {
    navigation.navigate("GameScreen");
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

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="user"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
            solid
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="crown"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="trophy"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSettingsButtonPress}
        >
          <Icon
            name="cog"
            style={[styles.buttonIcon, { fontSize: iconWidth }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {points}</Text>
      </View>

      {/* animate the play button */}
      <Animated.View>
        <TouchableOpacity
          style={[
            styles.playButton,
            { top: playButtonPosition },
            {
              transform: [{ translateX: animation }, { scale: scaleAnimation }],
            },
          ]}
          onPress={handlePlayButtonPress}
        >
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Settings Overlay */}
      <Modal
        visible={settingsVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
      >
        <View style={styles.settingsOverlay}>
          {/* Settings Box Content */}
          <View style={styles.settingsBox}>
            <Text style={styles.settingsText}>Settings</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseSettings}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
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
    backgroundColor: "transparent",

    // paddingHorizontal: 12,
    // paddingVertical: 8,
    // borderRadius: 8,
    borderWidth: 2,
    width: "15%",
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 15,
    padding: 10,
  },
  buttonIcon: {
    justifyContent: "center",
    color: "#333",
  },

  // Score container
  scoreContainer: {
    width: "50%",
    backgroundColor: "blue",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  scoreText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  playButton: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    marginBottom: 20,
    // top: 300,
    // alignItems: "center",
    // width: "70%",
    // height: "40%",
  },
  playButtonText: {
    fontSize: 44,
    fontWeight: "bold",
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
  },
  settingsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
    fontWeight: "bold",
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
});

export default HomeScreen;
