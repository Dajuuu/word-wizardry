import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
  Image,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { saveCompletedLevel, loadCompletedLevels } from "./AsyncStorageUtils";
import { incrementClueCount } from "./ClueManager";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  decrementClueCount,
  loadClueCount,
  initializeClueCounts,
} from "./ClueManager"; // Import the clue count functions
import { Asset } from "expo-asset";
import { PointsContext } from "./PointsContext";
import { CreditsContext } from "./CreditsContext";
import BuyClueOverlay from "./BuyHintOverlay";
import CustomKeyboard from "./CustomKeyboard";
import CustomHeader from "./CustomHeader";

const CrosswordApp = ({ route }) => {
  const navigation = useNavigation();

  // Add points and check the points balance. Needed when completing the level
  const { addPoints } = useContext(PointsContext);
  const { points } = useContext(PointsContext);

  // credits removal - test
  const { addCredits } = useContext(CreditsContext);

  const [fadeAnim] = useState(new Animated.Value(0));

  // A hook for the 3rd hint - if there are no avaiable spaces for a given row, the button of the clue is locked
  const [availableSpaces, setAvailableSpaces] = useState(true);

  // Hooks needed when user runs out of the clues and choses to buy additional one
  const [showBuyClueOverlay1, setShowBuyClueOverlay1] = useState(false);
  const [showBuyClueOverlay2, setShowBuyClueOverlay2] = useState(false);
  const [showBuyClueOverlay3, setShowBuyClueOverlay3] = useState(false);

  // Import data/parameters for a given level
  const {
    levelName,
    GRID_DATA,
    ROW_CLUES,
    levelPoints,
    clueCount1Increase,
    clueCount2Increase,
    clueCount3Increase,
    creditsIncrease,
  } = route.params;

  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );

  // Information on what box/row is selected by the user
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Stores information if the user completed the level
  const [levelCompleted, setLevelCompleted] = useState(false);

  // This hook determines whether the level was previously completed or not
  // If it was, then the keyboard will not be visible for the user, and so
  // no changes for the given grid can be made
  const [checkIfLevelCompleted, setCheckIfLevelCompleted] = useState(false);

  // TODO check what does this is doing
  const inputRefs = useRef([]);

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

  const [displayedPoints, setDisplayedPoints] = useState(levelPoints);

  // Initialise data
  useEffect(() => {
    loadUserInput(); // Load saved user input for the given level
    checkLevelCompletion(); // Check if level is already completed
    initializeClueCounts(); // TODO Probaply it needs to be deleted because of the function below
    loadClueCounts(); // Load the clue counts for the user

    // Cache the hints icons
    const cacheIcon = async () => {
      await Asset.fromModule(
        require("./assets/hint1-mag-glass.png")
      ).downloadAsync();
      await Asset.fromModule(
        require("./assets/hint2-bulb.png")
      ).downloadAsync();
      await Asset.fromModule(
        require("./assets/hint3-dice.png")
      ).downloadAsync();
    };
    cacheIcon();
  }, []);

  // Check if the level was previosly completed, based on the data in the AsyncStorage
  const checkLevelCompletion = async () => {
    const completedLevels = await loadCompletedLevels();
    if (completedLevels.includes(levelName)) {
      // set the variable to true
      setCheckIfLevelCompleted(true);
    }
  };

  // Save the user input to AsyncStorage
  const saveUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.levelName}`;
      const userInput = hiddenGrid.map((row) =>
        row.map((box) => (box ? box.letter : ""))
      );
      await AsyncStorage.setItem(userInputKey, JSON.stringify(userInput));
    } catch (error) {
      console.log("Error saving user input:", error);
    }
  };
  // Load the user input from AsyncStorage
  const loadUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.levelName}`;
      const savedUserInput = await AsyncStorage.getItem(userInputKey);
      if (savedUserInput !== null) {
        const userInput = JSON.parse(savedUserInput);
        const restoredHiddenGrid = userInput.map((row, rowIndex) =>
          row.map((letter, columnIndex) => ({
            letter,
            isCorrect:
              letter === GRID_DATA[rowIndex][columnIndex].toUpperCase(),
          }))
        );
        setHiddenGrid(restoredHiddenGrid);
      }
    } catch (error) {
      console.log("Error loading user input:", error);
    }
  };
  // Delete the input (if needed)
  const deleteUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.levelName}`;
      await AsyncStorage.removeItem(userInputKey);
    } catch (error) {
      console.log("Error deleting user input:", error);
    }
  };

  // Determine which box is selected
  const handleBoxSelection = (rowIndex, columnIndex) => {
    setSelectedBox({ rowIndex, columnIndex });
    setSelectedRow(rowIndex);
  };

  // Fill boxes behaviour
  const handleBoxInput = (text, rowIndex, columnIndex) => {
    const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
    const inputtedLetter = text.toUpperCase();

    const updateHiddenGrid = () => {
      // Update hiddenGrid state
      const newHiddenGrid = [...hiddenGrid];
      newHiddenGrid[rowIndex][columnIndex] = {
        letter: inputtedLetter,
        isCorrect: inputtedLetter === hiddenLetter,
      };
      setHiddenGrid(newHiddenGrid);
      // Save user input
      saveUserInput();
      // Check if all boxes are filled correctly
      const isLevelFinished = newHiddenGrid.every((row) =>
        row.every((box) => box.isCorrect)
      );

      // When level is finished
      if (isLevelFinished) {
        setLevelCompleted(true);
      }
    };

    // TODO it was to increase performance - see what can be done here
    clearTimeout(inputRefs.current[rowIndex][columnIndex].timer);
    inputRefs.current[rowIndex][columnIndex].timer = setTimeout(
      updateHiddenGrid,
      1
    );

    // Select the box to the right, when previous box has a letter entered
    if (columnIndex < GRID_DATA[rowIndex].length - 1) {
      const nextColumnIndex = columnIndex + 1;
      handleBoxSelection(rowIndex, nextColumnIndex);
      const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
      nextInputRef && nextInputRef.focus();
    }
  };

  // Function to deal with button presses - more specific the keyboard
  const handleKeyPress = (key) => {
    if (selectedBox) {
      const { rowIndex, columnIndex } = selectedBox;

      if (key === "") {
        // If backspace is pressed, delete the content of the selected box
        handleBoxInput("", rowIndex, columnIndex);
        inputRefs.current[rowIndex][columnIndex].focus();

        // Move the selection to the left after pressing the backspace
        const nextColumnIndex = columnIndex - 1;
        if (nextColumnIndex >= 0) {
          handleBoxSelection(rowIndex, nextColumnIndex);
          const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
          nextInputRef && nextInputRef.focus();
        }
      } else {
        // If any other key is pressed, handle it as usual
        handleBoxInput(key, rowIndex, columnIndex);
        inputRefs.current[rowIndex][columnIndex].focus();
      }
    }
  };

  // Hint system
  const handleCluePress = async (index) => {
    // Retrieve clue count for the given index
    const clueCount = await loadClueCount(index);

    if (clueCount > 0) {
      // Display updated clue count
      // console.log(`Clue ${index} remaining uses: ${updatedClueCount}`);
      // Retrieve the updated clue count after decrementing
      const updatedClueCount = await loadClueCount(index);

      // Hint 1 - reveal letter in a specific position
      if (index === 1 && selectedBox) {
        const { rowIndex, columnIndex } = selectedBox;
        const isBoxCorrect = hiddenGrid[rowIndex][columnIndex].isCorrect;

        if (!isBoxCorrect) {
          // Decrement clue count for the given index
          await decrementClueCount(index);
          // Retrieve the updated clue count after decrementing
          const updatedClueCount = await loadClueCount(index);

          // Handle clue 1
          const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
          const newHiddenGrid = [...hiddenGrid];
          newHiddenGrid[rowIndex][columnIndex] = {
            letter: hiddenLetter,
            isCorrect: true,
          };
          setHiddenGrid(newHiddenGrid);
          saveUserInput();
          // Update clue count
          setClueCount1(updatedClueCount);

          // Select the box to the right after the letter was put in a box using this hint
          if (columnIndex < GRID_DATA[rowIndex].length - 1) {
            const nextColumnIndex = columnIndex + 1;
            handleBoxSelection(rowIndex, nextColumnIndex);
            const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
            nextInputRef && nextInputRef.focus();
          }
        } else {
          console.log("Selected box is already correct. Clue not used.");
        }
      }

      // Hint 2 - reveal whole row (all letters)
      if (index === 2 && selectedRow !== null) {
        const isRowCorrect = hiddenGrid[selectedRow].every(
          (box) => box.isCorrect
        );

        if (!isRowCorrect) {
          // Decrement clue count for the given index
          await decrementClueCount(index);
          // Retrieve the updated clue count after decrementing
          const updatedClueCount = await loadClueCount(index);

          // Handle clue 2
          const newHiddenGrid = [...hiddenGrid];
          const rowLength = newHiddenGrid[selectedRow].length;
          for (let i = 0; i < rowLength; i++) {
            const hiddenLetter = GRID_DATA[selectedRow][i].toUpperCase();
            newHiddenGrid[selectedRow][i] = {
              letter: hiddenLetter,
              isCorrect: true,
            };
          }
          setHiddenGrid(newHiddenGrid);
          saveUserInput();
          // Update clue count
          setClueCount2(updatedClueCount);
        } else {
          console.log("Selected row is already correct. Clue not used.");
        }
      }

      // Hint 3 - reveal two letters in random positions
      // Problem - letters are inputed inside letters already revealed
      if (index === 3 && selectedRow !== null) {
        // Handle clue 3
        const newHiddenGrid = [...hiddenGrid];
        const rowLength = newHiddenGrid[selectedRow].length;

        // Create an array to keep track of available positions
        const availablePositions = [];
        for (let i = 0; i < rowLength; i++) {
          if (!newHiddenGrid[selectedRow][i].isCorrect) {
            availablePositions.push(i);
          }
        }

        // Ensure there are enough available positions to reveal letters
        if (availablePositions.length >= 2) {
          // Decrement clue count for the given index
          await decrementClueCount(index);

          // Retrieve the updated clue count after decrementing
          const updatedClueCount = await loadClueCount(index);

          // Generate two random positions from the available positions
          const randomIndex1 = Math.floor(
            Math.random() * availablePositions.length
          );
          let randomIndex2;
          do {
            randomIndex2 = Math.floor(
              Math.random() * availablePositions.length
            );
          } while (randomIndex2 === randomIndex1);

          const randomPosition1 = availablePositions[randomIndex1];
          const randomPosition2 = availablePositions[randomIndex2];

          // Set the letters at the random positions
          const hiddenLetter1 =
            GRID_DATA[selectedRow][randomPosition1].toUpperCase();
          const hiddenLetter2 =
            GRID_DATA[selectedRow][randomPosition2].toUpperCase();
          newHiddenGrid[selectedRow][randomPosition1] = {
            letter: hiddenLetter1,
            isCorrect: true,
          };
          newHiddenGrid[selectedRow][randomPosition2] = {
            letter: hiddenLetter2,
            isCorrect: true,
          };

          setHiddenGrid(newHiddenGrid);
          saveUserInput();
          // Update clue count
          setClueCount3(updatedClueCount);
        } else {
          console.log("Not enough available positions to reveal letters.");
        }
      }

      // Check if all boxes are filled correctly and determine if level is finished
      const isLevelFinished = hiddenGrid.every((row) =>
        row.every((box) => box.isCorrect)
      );

      // When level is finished
      if (isLevelFinished) {
        setLevelCompleted(true);
      }
    } else {
      console.log(`Clue ${index} has no remaining uses.`);
    }
  };

  // Hide system keyboard for both systems
  const disableBuiltInKeyboard = () => {
    if (Platform.OS === "ios") {
      return { editable: false };
    } else {
      return { editable: false, pointerEvents: "none" };
    }
  };

  // console.log(clueCount1 + clueCount1Increase);
  const closeModal = async () => {
    // After closing the modal declare setLevelCompleted to false to properly close the overlay
    setLevelCompleted(false);
    // Add points on closing the box
    // Small fix for the points doubling in some cases
    // Thats why the addPoints function with passed variable is here, instead of isLevelFinished
    addPoints(levelPoints);
    // When level is finished, clocking goes back to the level selection screen
    // navigation.goBack();

    // Delete saved user input for the given level
    // deleteUserInput();
    incrementClueCount(1, clueCount1Increase);
    incrementClueCount(2, clueCount2Increase);
    incrementClueCount(3, clueCount3Increase);
    addCredits(creditsIncrease);
    // Save the name of the completed level to the AsyncStorage

    // Navigate back to the level selection screen with completion status and level name as parameters
    console.log("Points added - navigating to the difficulty selection");
    navigation.navigate("GameScreen", {
      levelCompleted: true,
      completedLevelName: levelName,
    });
    await saveCompletedLevel(levelName);
    // Add clues and credits on level completion ()

    // Remove credits - test
    // removeCredits(100);
  };

  // Clue overlay when buying additonal one, appropriate data is passed, based on which clue was selected
  // Variables to determine the cost for particular hint
  const creditsCostHint1 = 10;
  const creditsCostHint2 = 50;
  const creditsCostHint3 = 30;

  // Overlay for hint 1
  const renderBuyClueOverlay1 = clueCount1 === 0 && (
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
  const renderBuyClueOverlay2 = clueCount2 === 0 && (
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
  const renderBuyClueOverlay3 = clueCount3 === 0 && (
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

  // Animation for "Level Completed" text
  useEffect(() => {
    if (levelCompleted) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Final value for opacity: 1
        duration: 1500, // Animation duration in milliseconds
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }
  }, [levelCompleted]);

  useEffect(() => {
    let interval;

    if (levelCompleted) {
      setDisplayedPoints(levelPoints);

      const targetPoints = levelPoints + points;
      const steps = 10; // Adjust the number of steps as needed
      const stepValue = Math.ceil((targetPoints - levelPoints) / steps);

      interval = setInterval(() => {
        if (displayedPoints < targetPoints) {
          setDisplayedPoints((prevPoints) =>
            Math.min(prevPoints + stepValue, targetPoints)
          );
        } else {
          clearInterval(interval);
        }
      }, 10); // Adjust the interval duration as needed
    }

    return () => {
      clearInterval(interval);
    };
  }, [levelCompleted]);

  return (
    <View style={styles.container}>
      {/* Custom header component */}
      <CustomHeader
        title={levelName} // import the level name to the header
      />

      {/* Grid */}
      <ScrollView horizontal>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {GRID_DATA.map((row, rowIndex) => {
            inputRefs.current[rowIndex] = [];

            return (
              <View
                key={rowIndex}
                style={[
                  styles.row,
                  selectedRow === rowIndex && styles.highlightedRow,
                ]}
              >
                {row.map((box, columnIndex) => {
                  const isBoxSelected =
                    selectedBox &&
                    selectedBox.rowIndex === rowIndex &&
                    selectedBox.columnIndex === columnIndex;

                  const hiddenLetter =
                    GRID_DATA[rowIndex][columnIndex].toUpperCase();
                  const inputtedLetter =
                    hiddenGrid[rowIndex][columnIndex]?.letter;

                  const isLetterCorrect =
                    hiddenGrid[rowIndex][columnIndex]?.isCorrect || false;

                  return (
                    <TouchableOpacity
                      key={columnIndex}
                      style={[
                        styles.box,
                        isBoxSelected && { backgroundColor: "yellow" },
                        isLetterCorrect && { backgroundColor: "#9ec4e8" },
                      ]}
                      onPress={() => handleBoxSelection(rowIndex, columnIndex)}
                    >
                      {isBoxSelected ? (
                        <TextInput
                          style={styles.boxText}
                          maxLength={1}
                          value={inputtedLetter}
                          onChangeText={(text) =>
                            handleBoxInput(text, rowIndex, columnIndex)
                          }
                          ref={(ref) =>
                            (inputRefs.current[rowIndex][columnIndex] = ref)
                          }
                          autoFocus={true}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            if (columnIndex < GRID_DATA[rowIndex].length - 1) {
                              const nextInputRef =
                                inputRefs.current[rowIndex][columnIndex + 1];
                              nextInputRef && nextInputRef.focus();
                            }
                          }}
                          {...disableBuiltInKeyboard()}
                        />
                      ) : (
                        <Text style={styles.boxText}>
                          {hiddenGrid[rowIndex][columnIndex]?.letter || ""}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>

      {/* Clues and hints */}
      {selectedRow !== null && !checkIfLevelCompleted && (
        <View style={styles.clueContainer}>
          <Text style={styles.clueText}>{ROW_CLUES[selectedRow]}</Text>

          <View style={styles.clueButtonsContainer}>
            <TouchableOpacity
              style={styles.clueButton}
              onPress={() =>
                clueCount1 === 0
                  ? setShowBuyClueOverlay1(true)
                  : handleCluePress(1)
              }
            >
              {/* Render Buy Hint overlay */}
              {renderBuyClueOverlay1}
              <View style={styles.singleButtonContainer}>
                {/* Render the icon */}
                <Image
                  source={require("./assets/hint1-mag-glass.png")}
                  style={styles.hintImage}
                />

                {/* Clue count container */}
                <View style={styles.clueCountContainer}>
                  <Text style={styles.clueCountText}>{clueCount1}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clueButton}
              onPress={() =>
                clueCount2 === 0
                  ? setShowBuyClueOverlay2(true)
                  : handleCluePress(2)
              }
            >
              {/* Render Buy Hint overlay */}
              {renderBuyClueOverlay2}
              <View style={styles.singleButtonContainer}>
                {/* Render the icon */}
                <Image
                  source={require("./assets/hint2-bulb.png")}
                  style={styles.hintImage}
                />

                {/* Clue count container */}
                <View style={styles.clueCountContainer}>
                  <Text style={styles.clueCountText}>{clueCount2}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clueButton}
              onPress={() =>
                clueCount3 === 0
                  ? setShowBuyClueOverlay3(true)
                  : handleCluePress(3)
              }
            >
              {/* Render Buy Hint overlay */}
              {renderBuyClueOverlay3}
              <View style={styles.singleButtonContainer}>
                {/* Render the icon */}
                <Image
                  source={require("./assets/hint3-dice.png")}
                  style={styles.hintImage}
                />

                {/* Clue count container */}
                <View style={styles.clueCountContainer}>
                  <Text style={styles.clueCountText}>{clueCount3}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Custom keyboard */}
      {checkIfLevelCompleted ? null : (
        <CustomKeyboard onKeyPress={handleKeyPress} />
      )}

      {/* Display overlay if level is completed */}
      {levelCompleted && (
        <Modal
          visible={levelCompleted}
          animationType="fade"
          transparent
          statusBarTranslucent
        >
          <View style={styles.overlay}>
            <View style={styles.overlayBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="check"
                  style={[styles.iconStyle, { color: "white" }]}
                />
              </View>
              <Animated.Text
                style={[styles.overlayText, { opacity: fadeAnim }]}
              >
                Level Complete!
              </Animated.Text>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>Total Score:</Text>
                <Text style={styles.scoreTextValue}>{displayedPoints}</Text>
              </View>
              {/* Rewards section */}
              <Text style={styles.overlayText}>Rewards</Text>
              <View style={styles.singleButtonContainer}>
                <Image
                  source={require("./assets/credits.png")}
                  style={styles.hintImage}
                />
                <Text>x{creditsIncrease}</Text>
              </View>
              <View style={styles.singleButtonContainer}>
                {clueCount1Increase !== 0 && (
                  <>
                    <Image
                      source={require("./assets/hint1-mag-glass.png")}
                      style={styles.hintImage}
                    />
                    <Text>x{clueCount1Increase}</Text>
                  </>
                )}

                {clueCount2Increase !== 0 && (
                  <>
                    <Image
                      source={require("./assets/hint2-bulb.png")}
                      style={styles.hintImage}
                    />
                    <Text>x{clueCount1Increase}</Text>
                  </>
                )}
                {clueCount3Increase !== 0 && (
                  <>
                    <Image
                      source={require("./assets/hint3-dice.png")}
                      style={styles.hintImage}
                    />
                    <Text>x{clueCount1Increase}</Text>
                  </>
                )}
              </View>

              <TouchableOpacity
                style={styles.goBackButton}
                onPress={closeModal}
              >
                <Text style={styles.goBackButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b9d8f5",
    // backgroundColor: "#b5ffd9",
  },
  gridContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start", // Align boxes to the left
  },
  highlightedRow: {
    backgroundColor: "rgba(184,135,94,0.8)",
    paddingVertical: 2,
    borderRadius: 8,
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    padding: 5,
    borderRadius: 4,
    backgroundColor: "rgba(255, 228, 204, 0.7)",
  },
  boxText: {
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayBox: {
    backgroundColor: "rgba(250,234,219,1)",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    width: "80%",
  },
  overlayText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  clueContainer: {
    width: "120%",
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: "#CE8B53",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#9b673a",
  },
  clueText: {
    fontSize: 18,
    // marginTop: 10,
    alignSelf: "center",
  },
  clueButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  clueButton: {
    marginTop: 10,
    backgroundColor: "green",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  clueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  singleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // Add other styles to adjust the container size and spacing if needed
    // ...
  },
  hintImage: {
    width: 24,
    height: 24,
    // Add other styles for the icon if needed
    // ...
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
  clueCountText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    // position: "absolute",
    // top: windowHeight * 0.1,
    backgroundColor: "rgba(44, 122, 47,1)",
    padding: 20,
    borderRadius: 100,
    marginBottom: 15,
  },
  iconStyle: {
    fontSize: 30,
  },
  scoreBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "80%",
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 10,
  },
  scoreTextValue: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default CrosswordApp;
