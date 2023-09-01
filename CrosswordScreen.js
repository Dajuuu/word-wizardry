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
  Easing,
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
import { useSound } from "./SoundManager";

const CrosswordApp = ({ route }) => {
  const navigation = useNavigation();

  // Add points and check the points balance. Needed when completing the level
  const { addPoints } = useContext(PointsContext);
  const { points } = useContext(PointsContext);

  // credits removal - test
  const { addCredits } = useContext(CreditsContext);

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
  const [fadeAnim] = useState(new Animated.Value(0));
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [displayedPoints, setDisplayedPoints] = useState(levelPoints);
  const [rewardsAnimation] = useState(new Animated.Value(0));
  const [showButton, setShowButton] = useState(false);
  const fadeAnimButton = new Animated.Value(0);

  const [cluesAnimations] = useState([
    new Animated.Value(0), // For hint 1
    new Animated.Value(0), // For hint 2
    new Animated.Value(0), // For hint 3
  ]);

  // Import function that plays the sound
  const { handleSoundPlayOnClick } = useSound();

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

  // Animation to show the points gradually increasing
  useEffect(() => {
    let interval;

    if (levelCompleted) {
      setDisplayedPoints(levelPoints);

      const targetPoints = levelPoints + points;
      const steps = 20; // Adjust the number of steps as needed
      const stepValue = Math.ceil((targetPoints - levelPoints) / steps);

      interval = setInterval(() => {
        if (displayedPoints < targetPoints) {
          setDisplayedPoints((prevPoints) =>
            Math.min(prevPoints + stepValue, targetPoints)
          );
        } else {
          clearInterval(interval);
        }
      }, 2); // Adjust the interval duration as needed
    }

    return () => {
      clearInterval(interval);
    };
  }, [levelCompleted]);

  // Used for opacity animation
  useEffect(() => {
    // Create a sequence animation
    const sequenceAnimation = Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 0.5, // Semi-transparent
        duration: 1500, // Duration for fading out
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1, // Fully opaque
        duration: 1000, // Duration for fading in
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    // Start the sequence animation and loop it
    Animated.loop(sequenceAnimation).start();
  }, [opacityValue]);

  // Rewards pop up animation
  useEffect(() => {
    if (levelCompleted) {
      // Start rewards animation
      Animated.timing(rewardsAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    }
  }, [levelCompleted, rewardsAnimation]);

  // Animations for hint icons
  useEffect(() => {
    let delay = 0; // Initial delay for the first hint

    if (levelCompleted) {
      if (clueCount1Increase !== 0) {
        // Start animation for hint 1
        Animated.timing(cluesAnimations[0], {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }).start();

        delay += 100; // Add delay for the next hint
      }

      if (clueCount2Increase !== 0) {
        // Start animation for hint 2
        Animated.timing(cluesAnimations[1], {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }).start();

        delay += 100; // Add delay for the next hint
      }

      if (clueCount3Increase !== 0) {
        // Start animation for hint 3
        Animated.timing(cluesAnimations[2], {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [
    levelCompleted,
    clueCount1Increase,
    clueCount2Increase,
    clueCount3Increase,
    cluesAnimations,
  ]);

  // Delay to show the go back button
  useEffect(() => {
    const startAnimation = () => {
      // Start the fade-in animation
      Animated.timing(fadeAnimButton, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }).start(() => {
        setShowButton(true);
      });
    };

    if (levelCompleted) {
      const timeout = setTimeout(startAnimation, 200); // Delay the animation for 1.8 seconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [levelCompleted, fadeAnimButton]);

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
                {/* Big check mark at the top of the overlay */}
                <Icon
                  name="check"
                  style={[styles.iconStyle, { color: "white" }]}
                />
              </View>
              {/* Level completed text */}
              <Animated.Text
                style={[styles.overlayText, { opacity: fadeAnim }]}
              >
                Level Complete!
              </Animated.Text>
              {/* Score box with information of the user's total points  */}
              <View style={styles.scoreBox}>
                <Animated.Text
                  style={[styles.scoreText, { opacity: opacityValue }]}
                >
                  Your total points:
                </Animated.Text>
                <Text style={styles.scoreTextValue}>{displayedPoints}</Text>
              </View>
              {/* Rewards section */}
              <Text style={styles.rewardsTitleText}>Rewards</Text>
              <View style={styles.rowDirectionContainer}>
                <Animated.Image
                  source={require("./assets/credits.png")}
                  style={[
                    styles.creditsIcon,
                    {
                      opacity: rewardsAnimation,
                      transform: [
                        {
                          scale: rewardsAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <Animated.Text
                  style={[
                    styles.rewardsText,
                    {
                      opacity: rewardsAnimation,
                    },
                  ]}
                >
                  x{creditsIncrease}
                </Animated.Text>
              </View>
              <View
                style={[
                  styles.rowDirectionContainer,
                  (clueCount1Increase !== 0 ||
                    clueCount2Increase !== 0 ||
                    clueCount3Increase !== 0) &&
                    styles.hintsBackground,
                  { marginTop: 5 },
                ]}
              >
                {clueCount1Increase !== 0 && (
                  <Animated.View
                    style={[
                      styles.imageSpacing,
                      {
                        opacity: cluesAnimations[0],
                        transform: [
                          {
                            translateY: cluesAnimations[0].interpolate({
                              inputRange: [0, 1],
                              outputRange: [100, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Image
                      source={require("./assets/hint1-mag-glass.png")}
                      style={styles.hintImage}
                    />
                    <Text style={styles.hintText}>x{clueCount1Increase}</Text>
                  </Animated.View>
                )}

                {clueCount2Increase !== 0 && (
                  <Animated.View
                    style={[
                      styles.imageSpacing,
                      {
                        opacity: cluesAnimations[1],
                        transform: [
                          {
                            translateY: cluesAnimations[1].interpolate({
                              inputRange: [0, 1],
                              outputRange: [100, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Image
                      source={require("./assets/hint2-bulb.png")}
                      style={styles.hintImage}
                    />
                    <Text style={styles.hintText}>x{clueCount2Increase}</Text>
                  </Animated.View>
                )}

                {clueCount3Increase !== 0 && (
                  <Animated.View
                    style={[
                      styles.imageSpacing,
                      {
                        opacity: cluesAnimations[2],
                        transform: [
                          {
                            translateY: cluesAnimations[2].interpolate({
                              inputRange: [0, 1],
                              outputRange: [100, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Image
                      source={require("./assets/hint3-dice.png")}
                      style={styles.hintImage}
                    />
                    <Text style={styles.hintText}>x{clueCount3Increase}</Text>
                  </Animated.View>
                )}
              </View>

              {showButton && (
                <Animated.View style={{ opacity: fadeAnimButton }}>
                  <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => {
                      closeModal();
                      handleSoundPlayOnClick();
                    }}
                  >
                    <Text style={styles.goBackButtonText}>Continue</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
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
    marginBottom: 10,
    fontFamily: "AppFontBold",
  },
  rewardsTitleText: {
    marginTop: 10,
    fontSize: 27,
    fontFamily: "AppFontBold",
  },
  rewardsText: {
    fontSize: 18,
    fontFamily: "AppFontBold",
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
    color: "#fff",
    fontFamily: "AppFontBold",
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
    fontFamily: "AppFontBold",
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
  rowDirectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // Add other styles to adjust the container size and spacing if needed
    // ...
  },
  hintImage: {
    width: 32,
    height: 32,
    // Add other styles for the icon if needed
    // ...
  },
  hintText: {
    marginHorizontal: 5,
    fontSize: 15,
    fontFamily: "AppFontBold",
  },

  imageSpacing: {
    paddingHorizontal: 10,
  },
  creditsIcon: {
    width: 36,
    height: 36,
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
    color: "#333",
    // Problem - this may be wrong for different devices - need to check that
    marginBottom: 3,
    fontFamily: "AppFontBold",
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
    backgroundColor: "rgb(166, 166, 166)",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "80%",
    elevation: 8, // Android shadow
    // shadowColor: "#000", // iOS shadow
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  hintsBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(166, 166, 166)",
    padding: 10,
    borderRadius: 10,
    elevation: 4, // Android shadow
    // shadowColor: "#000", // iOS shadow
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "AppFont",
  },
  scoreTextValue: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default CrosswordApp;
