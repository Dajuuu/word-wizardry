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
} from "react-native";
import CustomHeader from "./CustomHeader";
import {
  checkUsernameInStorage,
  updateUsername, // Import the updateUsername function
} from "./UserNameManager";
import BuyClueOverlay from "./BuyHintOverlay";
import Icon from "react-native-vector-icons/FontAwesome5";

import { loadClueCount, initializeClueCounts } from "./ClueManager"; // Import the clue count functions

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const UserProfile = () => {
  // Initialize clue counts
  const [clueCount1, setClueCount1] = useState();
  const [clueCount2, setClueCount2] = useState();
  const [clueCount3, setClueCount3] = useState();

  // Load the clue counts from the AsyncStorage and assign them to the useState hooks
  const loadClueCounts = async () => {
    const count1 = await loadClueCount(1);
    const count2 = await loadClueCount(2);
    const count3 = await loadClueCount(3);

    setClueCount1(count1);
    setClueCount2(count2);
    setClueCount3(count3);
  };

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState(""); // State for the new username input
  const [showBuyClueOverlay1, setShowBuyClueOverlay1] = useState(false);
  const [showBuyClueOverlay2, setShowBuyClueOverlay2] = useState(false);
  const [showBuyClueOverlay3, setShowBuyClueOverlay3] = useState(false);

  const imagePaths = [
    require("./assets/BackgroundImages/1.png"),
    require("./assets/BackgroundImages/2.png"),
    require("./assets/BackgroundImages/3.png"),
    require("./assets/BackgroundImages/4.png"),
    require("./assets/BackgroundImages/5.png"),
    require("./assets/BackgroundImages/6.png"),
    // Add more image paths here
  ];

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await checkUsernameInStorage();
      setUsername(storedUsername);
    };

    fetchUsername();
  }, []);
  useEffect(() => {
    initializeClueCounts(); // TODO Probaply it needs to be deleted because of the function below
    loadClueCounts(); // Load the clue counts for the user
  }, []);
  // Function to handle the new username input change
  const handleUsernameChange = (text) => {
    setNewUsername(text);
  };

  // Function to update the username
  const handleUpdateUsername = async () => {
    if (newUsername.trim() === "") {
      // Handle case where the input is empty or contains only whitespace
      alert("Username cannot be empty");
      return;
    }

    // Call the updateUsername function to update AsyncStorage
    await updateUsername(newUsername);

    // Update the displayed username
    setUsername(newUsername);

    // Clear the new username input field
    setNewUsername("");
  };
  const creditsCostHint1 = 10;
  const creditsCostHint2 = 50;
  const creditsCostHint3 = 30;

  // Overlay for hint 1
  const renderBuyClueOverlay1 = (
    <BuyClueOverlay
      visible={showBuyClueOverlay1}
      onClose={() => setShowBuyClueOverlay1(false)}
      onBuyClue={async () => {
        setShowBuyClueOverlay1(false); // Close the overlay after buying
        setClueCount1(clueCount1 + 1); // Update the clue count
      }}
      clueNumber={1} // Pass the clue number as a prop
      creditsDecrement={creditsCostHint1} // Remove Credits when buying the hint
    />
  );
  // Overlay for hint 2
  const renderBuyClueOverlay2 = (
    <BuyClueOverlay
      visible={showBuyClueOverlay2}
      onClose={() => setShowBuyClueOverlay2(false)}
      onBuyClue={async () => {
        setShowBuyClueOverlay2(false); // Close the overlay after buying
        setClueCount2(clueCount2 + 1); // Update the clue count
      }}
      clueNumber={2} // Pass the clue number as a prop
      creditsDecrement={creditsCostHint2} // Remove Credits when buying the hint
    />
  );
  const renderBuyClueOverlay3 = (
    <BuyClueOverlay
      visible={showBuyClueOverlay3}
      onClose={() => setShowBuyClueOverlay3(false)}
      onBuyClue={async () => {
        setShowBuyClueOverlay3(false); // Close the overlay after buying
        setClueCount3(clueCount3 + 1); // Update the clue count
      }}
      clueNumber={3} // Pass the clue number as a prop
      creditsDecrement={creditsCostHint3} // Remove Credits when buying the hint
    />
  );
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <CustomHeader title="Profile" />

        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Your Username</Text>
          <View style={styles.usernameInput}>
            <TextInput
              style={styles.input}
              placeholder={username}
              onChangeText={handleUsernameChange}
              value={newUsername}
            />
            <TouchableOpacity
              onPress={handleUpdateUsername}
              style={styles.updateButton}
            >
              <Icon name="pen" style={[styles.buttonIcon]} solid />
            </TouchableOpacity>
          </View>
          <View style={styles.userStats}>
            <View style={styles.borderLineTop} />
            {/* Total Points */}
            <View style={styles.statContainer}>
              <Text style={styles.statLabel}>Total Score:</Text>
              <Text style={styles.statValue}>1000</Text>
            </View>

            {/* Hint 1 */}

            <View style={styles.clueButtonsContainer}>
              <TouchableOpacity
                style={styles.clueButton}
                onPress={() => setShowBuyClueOverlay1(true)}
              >
                {/* Render Buy Hint overlay */}
                {renderBuyClueOverlay1}
                <View style={styles.rowDirectionContainer}>
                  {/* Render the icon */}
                  <Image
                    source={require("./assets/hint1-mag-glass.png")}
                    style={styles.hintImage}
                  />

                  {/* Clue count container */}
                  <View style={styles.clueCountContainer}>
                    <Text style={styles.clueCountText}>{clueCount1}</Text>
                  </View>
                  {/* Plus sign indicator */}
                  <View style={styles.clueAddContainer}>
                    <Text style={styles.clueAddText}>+</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clueButton}
                onPress={() => setShowBuyClueOverlay2(true)}
              >
                {/* Render Buy Hint overlay */}
                {renderBuyClueOverlay2}
                <View style={styles.rowDirectionContainer}>
                  {/* Render the icon */}
                  <Image
                    source={require("./assets/hint2-bulb.png")}
                    style={styles.hintImage}
                  />

                  {/* Clue count container */}
                  <View style={styles.clueCountContainer}>
                    <Text style={styles.clueCountText}>{clueCount2}</Text>
                  </View>
                  {/* Plus sign indicator */}
                  <View style={styles.clueAddContainer}>
                    <Text style={styles.clueAddText}>+</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clueButton}
                onPress={() => setShowBuyClueOverlay3(true)}
              >
                {/* Render Buy Hint overlay */}
                {renderBuyClueOverlay3}
                <View style={styles.rowDirectionContainer}>
                  {/* Render the icon */}
                  <Image
                    source={require("./assets/hint3-dice.png")}
                    style={styles.hintImage}
                  />

                  {/* Clue count container */}
                  <View style={styles.clueCountContainer}>
                    <Text style={styles.clueCountText}>{clueCount3}</Text>
                  </View>
                  {/* Plus sign indicator */}
                  <View style={styles.clueAddContainer}>
                    <Text style={styles.clueAddText}>+</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Button to confirm the username change */}

        <View style={styles.backgroundChange}>
          <Text style={styles.backgroundChangeText}>
            Background Change Section
          </Text>
          <FlatList
            data={imagePaths}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={item} style={styles.imageItem} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5e1ce",
  },
  userInfo: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  userInfoText: {
    fontSize: 24,
    fontFamily: "AppFontBold",
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    // height: 40,
    borderColor: "gray",
    borderWidth: 1,
    // marginTop: 20,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: "AppFontBold",
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: "#007BFF",
    padding: 16, // changing this make the whole component resize
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // borderRadius: 5,
    // marginTop: 10,
  },
  updateButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  backgroundChange: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightcoral",
  },
  backgroundChangeText: {
    fontSize: 24,
  },
  usernameInput: {
    flexDirection: "row",
    width: "90%",
    // alignItems: "center",
    justifyContent: "center",
  },
  borderLineTop: {
    borderTopWidth: 1,
    width: "90%",
    marginVertical: 16,
    elevation: 5,
  },
  userStats: {
    // marginTop: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightblue", // Change to your desired color
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute the children's space evenly
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "gray",
    width: "80%",
    padding: 6,
    elevation: 4,
    borderRadius: 10,
  },
  statLabel: {
    fontSize: 20,
    fontFamily: "AppFontBold",
    marginRight: 10,
  },
  statValue: {
    fontSize: 18,
    fontFamily: "AppFont",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 3,
  },
  scrollViewContainer: {
    flexGrow: 1, // Allow the content to grow within the ScrollView
  },
  hintImage: {
    width: 32,
    height: 32,

    // Add other styles for the icon if needed
    // ...
  },
  clueButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  clueButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: windowHeight * 0.01,
    borderRadius: 8,
    marginHorizontal: 25,
  },
  clueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  clueCountContainer: {
    position: "absolute",
    bottom: 25,
    left: 25,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  clueAddContainer: {
    position: "absolute",
    bottom: -25,
    left: 25,
    backgroundColor: "rgba(255,215,0,1)",
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  clueCountText: {
    fontSize: 15,
    color: "#333",
    // Problem - this may be wrong for different devices - need to check that
    marginBottom: 3,
    fontFamily: "AppFontBold",
  },
  clueAddText: {
    fontSize: 20,
    color: "#333",
    // Problem - this may be wrong for different devices - need to check that
    marginBottom: 3,
    fontFamily: "AppFontBold",
  },
  imageItem: {
    width: 80,
    height: 140,
    margin: 5,
    resizeMode: "cover",
  },
});

export default UserProfile;
