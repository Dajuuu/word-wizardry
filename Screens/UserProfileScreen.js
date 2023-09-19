import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Keyboard,
  LayoutAnimation,
  UIManager,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import CustomHeader from "../CustomHeader";
import { checkUsernameInStorage, updateUsername } from "../UserNameManager";
import BuyHintOverlay from "../BuyHintOverlay";
import Icon from "react-native-vector-icons/FontAwesome5";
import { backgroundImagePaths } from "../BackgroundManager";
import { loadHintCount, initializeHintCounts } from "../HintManager";
import { setStoredBackgroundImage } from "../BackgroundManager";
import { LinearGradient } from "expo-linear-gradient";
import { useButtonClickSound } from "../SoundManager";
import LoadingScreen from "./LoadingScreen";

// Experimental layout animations for Android
// https://reactnative.dev/docs/layoutanimation
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  // Close the loading screen after x seconds
  // This way everyting is loaded properly
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  // Track whether the section is hidden or not
  const [isSectionHidden, setSectionHidden] = useState(false);

  // Display a text when username was updated
  const [usernameUpdateText, setUsernameUpdateText] = useState(false);
  // Display a text when username user tried to input is empty
  const [usernameEmptyText, setUsernameEmptyText] = useState(false);
  // Used for background change
  const [backgroundImageNumber, setBackgroundImageNumber] = useState(null);
  const handleImageSelect = async (newImageNumber) => {
    setBackgroundImageNumber(newImageNumber);
    await setStoredBackgroundImage(newImageNumber); // Call the function to update the background image index
  };
  // Initialize hint counts
  const [hintCount1, setHintCount1] = useState();
  const [hintCount2, setHintCount2] = useState();
  const [hintCount3, setHintCount3] = useState();

  // Hooks for the buy hint overlays
  const [showBuyHintOverlay1, setShowBuyHintOverlay1] = useState(false);
  const [showBuyHintOverlay2, setShowBuyHintOverlay2] = useState(false);
  const [showBuyHintOverlay3, setShowBuyHintOverlay3] = useState(false);
  // Load the hint counts from the AsyncStorage and assign them to the useState hooks
  const loadHintCounts = async () => {
    const count1 = await loadHintCount(1);
    const count2 = await loadHintCount(2);
    const count3 = await loadHintCount(3);

    setHintCount1(count1);
    setHintCount2(count2);
    setHintCount3(count3);
  };

  // Declare the cost of the hints
  const creditsCostHint1 = 15;
  const creditsCostHint2 = 50;
  const creditsCostHint3 = 30;

  // Hook for saving current username
  const [username, setUsername] = useState("");
  // Hook for saving new username, if the user changes it
  const [newUsername, setNewUsername] = useState("");

  // Function to handle the new username input change
  const handleUsernameChange = (text) => {
    // This is very important, as this line replaces any illegal characters.
    // Therefore the user will not be able to use those for new username
    // https://stackoverflow.com/questions/1162529/javascript-replace-regex
    text = text.replace(/[!€@#$%^&*(),.?":{}|<>]/g, "");
    setNewUsername(text);
  };

  // Fetch the current username
  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await checkUsernameInStorage();
      setUsername(storedUsername);
    };

    fetchUsername();
    // If the user does not have hintCounts declared - initalise them
    initializeHintCounts();
    // If the user does have hintCounts declared - load them
    loadHintCounts();
  }, []);

  useEffect(() => {
    // https://reactnative.dev/docs/keyboard
    // Add a listener for when the keyboard is shown
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Keyboard is shown, hide the section with animation
        LayoutAnimation.easeInEaseOut();
        setSectionHidden(true);
      }
    );

    // Add a listener for when the keyboard is hidden
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Keyboard is hidden, show the section again with animation
        LayoutAnimation.easeInEaseOut();
        setSectionHidden(false);
      }
    );

    // Cleanup the listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Function to update the username
  // Written with a help of ChatGPT
  const handleUpdateUsername = async () => {
    // Handle case where the input is empty or contains only whitespace
    if (newUsername.trim() === "") {
      // Make sure the Empty text is visible
      setUsernameEmptyText(true);
      setTimeout(() => {
        // Delay hiding of text components
        setUsernameEmptyText(false);
      }, 2500);
      return;
    }

    // Call the updateUsername function to update AsyncStorage
    await updateUsername(newUsername);

    // Update the displayed username
    setUsername(newUsername);

    // Clear the new username input field
    setNewUsername("");

    // Make sure the Update text is visible
    setUsernameUpdateText(true);

    // Delay hiding of text components
    setTimeout(() => {
      setUsernameUpdateText(false);
    }, 2500);
  };

  // Overlay for hint 1
  const renderBuyHintOverlay1 = (
    <BuyHintOverlay
      visible={showBuyHintOverlay1}
      onClose={() => setShowBuyHintOverlay1(false)}
      onBuyHint={async () => {
        setShowBuyHintOverlay1(false); // Close the overlay after buying
        setHintCount1(hintCount1 + 1); // Update the hint count
      }}
      hintNumber={1} // Pass the hint number as a prop
      creditsDecrement={creditsCostHint1} // Remove Credits when buying the hint
    />
  );
  // Overlay for hint 2
  const renderBuyHintOverlay2 = (
    <BuyHintOverlay
      visible={showBuyHintOverlay2}
      onClose={() => setShowBuyHintOverlay2(false)}
      onBuyHint={async () => {
        setShowBuyHintOverlay2(false); // Close the overlay after buying
        setHintCount2(hintCount2 + 1); // Update the hint count
      }}
      hintNumber={2} // Pass the hint number as a prop
      creditsDecrement={creditsCostHint2} // Remove Credits when buying the hint
    />
  );
  const renderBuyHintOverlay3 = (
    <BuyHintOverlay
      visible={showBuyHintOverlay3}
      onClose={() => setShowBuyHintOverlay3(false)}
      onBuyHint={async () => {
        setShowBuyHintOverlay3(false); // Close the overlay after buying
        setHintCount3(hintCount3 + 1); // Update the hint count
      }}
      hintNumber={3} // Pass the hint number as a prop
      creditsDecrement={creditsCostHint3} // Remove Credits when buying the hint
    />
  );

  return (
    // Container so everything is displayed properly with loading screen implementation
    <View style={styles.containerWhole}>
      {/* Display the screen after Loading Screen is finished */}
      {loading ? (
        <LoadingScreen />
      ) : (
        // Used to make sure the sections are aligned correctely when keyboard is visible
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Helps in handling the keyboard type out */}
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
          >
            <CustomHeader title="Profile" />
            <View style={styles.userInfo}>
              <View>
                {/* The Text needs to be put inside empty View for smooth animation (iOS) */}
                <Text style={styles.userInfoText}>Your Username</Text>
                {usernameUpdateText && (
                  <Text style={styles.userUpdateText}>Username Updated</Text>
                )}
                {usernameEmptyText && (
                  <Text style={styles.userUpdateText}>
                    Username cannot be empty
                  </Text>
                )}
              </View>
              <View style={styles.usernameInput}>
                {/* Username TextInput */}
                <TextInput
                  style={styles.input}
                  placeholder={username}
                  onChangeText={handleUsernameChange}
                  value={newUsername}
                  maxLength={15} // username cannot be longer than
                />
                <LinearGradient
                  colors={["rgb(0, 155, 0)", "rgb(0, 131, 0)"]}
                  start={{ x: 0.7, y: 0.1 }}
                  end={{ x: 0.9, y: 0.4 }}
                  style={styles.updateButtonGradient}
                >
                  <TouchableOpacity
                    onPress={handleUpdateUsername}
                    style={styles.updateButton}
                  >
                    <Icon name="pen" solid />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={styles.userStats}>
                {/* Border line to split this section */}
                <View style={styles.borderLineTop} />
                <View style={styles.hintButtonsContainer}>
                  {/* Hint 1 */}
                  <TouchableOpacity
                    style={styles.hintButton}
                    onPress={() => {
                      handleButtonSoundPlay();
                      setShowBuyHintOverlay1(true);
                    }}
                  >
                    {/* Render Buy Hint overlay */}
                    {renderBuyHintOverlay1}
                    <View style={styles.rowDirectionContainer}>
                      {/* Render the icon */}
                      <Image
                        source={require("../assets/hint1-mag-glass.png")}
                        style={styles.hintImage}
                      />

                      {/* hint count container */}
                      <View style={styles.hintCountContainer}>
                        <Text style={styles.hintCountText}>{hintCount1}</Text>
                      </View>
                      {/* Plus sign indicator */}
                      <View style={styles.hintAddContainer}>
                        <Text style={styles.hintAddText}>+</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* Hint 2 */}
                  <TouchableOpacity
                    style={styles.hintButton}
                    onPress={() => {
                      handleButtonSoundPlay();
                      setShowBuyHintOverlay2(true);
                    }}
                  >
                    {/* Render Buy Hint overlay */}
                    {renderBuyHintOverlay2}
                    <View style={styles.rowDirectionContainer}>
                      {/* Render the icon */}
                      <Image
                        source={require("../assets/hint2-bulb.png")}
                        style={styles.hintImage}
                      />

                      {/* hint count container */}
                      <View style={styles.hintCountContainer}>
                        <Text style={styles.hintCountText}>{hintCount2}</Text>
                      </View>
                      {/* Plus sign indicator */}
                      <View style={styles.hintAddContainer}>
                        <Text style={styles.hintAddText}>+</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* Hint 3 */}
                  <TouchableOpacity
                    style={styles.hintButton}
                    onPress={() => {
                      handleButtonSoundPlay();
                      setShowBuyHintOverlay3(true);
                    }}
                  >
                    {/* Render Buy Hint overlay */}
                    {renderBuyHintOverlay3}
                    <View style={styles.rowDirectionContainer}>
                      {/* Render the icon */}
                      <Image
                        source={require("../assets/hint3-dice.png")}
                        style={styles.hintImage}
                      />

                      {/* hint count container */}
                      <View style={styles.hintCountContainer}>
                        <Text style={styles.hintCountText}>{hintCount3}</Text>
                      </View>
                      {/* Plus sign indicator */}
                      <View style={styles.hintAddContainer}>
                        <Text style={styles.hintAddText}>+</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Background change section */}
            {!isSectionHidden && ( // Only show if the section is not hidden
              <View style={styles.backgroundChange}>
                <Text style={styles.backgroundChangeText}>
                  Change Background
                </Text>
                {/* Horizontal scrolling list */}
                <FlatList
                  data={Object.keys(backgroundImagePaths)} // Use Object.keys to get the keys of the backgroundImagePaths
                  keyExtractor={(item) => item.toString()} // Use the key as a string
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        // Assign new image index
                        handleImageSelect(parseInt(item));
                      }}
                    >
                      {/* Use the backgroundImagePaths object to get the source */}
                      <ImageBackground
                        source={backgroundImagePaths[item]}
                        style={styles.imageItem}
                      >
                        {/* Display an indicator of what image was chosen  */}
                        {backgroundImageNumber === parseInt(item) && (
                          <View style={styles.selectedIndicator}>
                            <Text style={styles.selectedText}>Selected</Text>
                          </View>
                        )}
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerWhole: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5e1ce",
  },
  scrollViewContainer: {
    // Allow the content to grow within the ScrollView
    flexGrow: 1,
  },
  userInfo: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A4BE7B",
    paddingVertical: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(129, 103, 79)",
  },
  userInfoText: {
    fontSize: 24,
    fontFamily: "AppFontBold",
    marginBottom: 15,
  },
  userUpdateText: {
    fontSize: 14,
    fontFamily: "AppFont",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: "AppFontBold",
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: "transparent",
    padding: 16,
  },
  updateButtonGradient: {
    backgroundColor: "transparent",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  backgroundChange: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5F8D4E",
    paddingVertical: 20,
  },
  backgroundChangeText: {
    fontSize: 24,
    fontFamily: "AppFontBold",
    marginBottom: 10,
  },
  usernameInput: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
  },
  borderLineTop: {
    borderTopWidth: 1,
    width: "90%",
    marginTop: 30,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userStats: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hintImage: {
    width: 32,
    height: 32,
  },
  hintButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  hintButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: windowHeight * 0.014,
    borderRadius: 8,
    marginHorizontal: 25,
  },
  hintCountContainer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  hintAddContainer: {
    position: "absolute",
    bottom: -30,
    left: 30,
    backgroundColor: "rgba(255,215,0,1)",
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  hintCountText: {
    fontSize: 15,
    color: "#333",
    fontFamily: "AppFontBold",
    alignSelf: "center",
    justifyContent: "center",
  },
  hintAddText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "AppFontBold",
    alignSelf: "center",
    justifyContent: "center",
  },
  imageItem: {
    width: windowHeight * 0.1,
    height: windowHeight * 0.22,
    margin: 5,
    resizeMode: "cover",
  },
  selectedIndicator: {
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    padding: 5,
  },
  selectedText: {
    color: "white",
    fontSize: 12,
    fontFamily: "AppFontBold",
  },
});

export default UserProfile;
