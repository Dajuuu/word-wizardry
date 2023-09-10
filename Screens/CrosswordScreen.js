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
  Vibration,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

import BuyHintOverlay from "../BuyHintOverlay";
import CustomKeyboard from "../CustomKeyboard";
import CustomHeader from "../CustomHeader";
import LoadingScreen from "./LoadingScreen";

import {
  decrementHintCount,
  loadHintCount,
  initializeHintCounts,
} from "../HintManager";
import { saveCompletedLevel, loadCompletedLevels } from "../AsyncStorageUtils";
import { incrementHintCount } from "../HintManager";
import { PointsContext } from "../PointsContext";
import { CreditsContext } from "../CreditsContext";
import { useButtonClickSound, useLevelCompletedSound } from "../SoundManager";
import { useVibrationSetting } from "../SoundSettingContext";
import {
  getBackgroundImage,
  backgroundImagePaths,
  DEFAULT_BACKGROUND,
} from "../BackgroundManager";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const CrosswordApp = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  // Close the loading screen after x seconds
  // This way everyting is loaded properly
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  // Load the background image for the crossword
  const [backgroundImageSource, setBackgroundImageSource] = useState(
    backgroundImagePaths[DEFAULT_BACKGROUND] // Set a default background image
  );

  // Add points and check the points balance. Needed when completing the level
  const { addPoints } = useContext(PointsContext);
  const { points } = useContext(PointsContext);
  // Add credits. Also needed when completing the level
  const { addCredits } = useContext(CreditsContext);

  // Hooks needed when user runs out of the hints and choses to buy additional one
  const [showBuyHintOverlay1, setShowBuyHintOverlay1] = useState(false);
  const [showBuyHintOverlay2, setShowBuyHintOverlay2] = useState(false);
  const [showBuyHintOverlay3, setShowBuyHintOverlay3] = useState(false);

  // This way the horizontal ScrollView can be shifted when the next box is selected
  const horizontalScrollViewRef = useRef(null);

  // This hook adjusts the side (to the left or right) which the horizontal scrolling is performed,
  // depending on whether the user inputs the letters or uses backspace
  const [shouldScrollToTheRight, setShouldScrollToTheRight] = useState(false);

  // Import data/parameters for a given level
  const {
    levelName,
    GRID_DATA,
    ROW_CLUES,
    levelPoints,
    hintCount1Increase,
    hintCount2Increase,
    hintCount3Increase,
    creditsIncrease,
  } = route.params;

  // Hidden grid is a grid with all correct letters that is hidden from the user.
  // This is needed to compare the user's letters with the grid's, and this way determining if
  // the user's input is correct or not
  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );
  // Determine whether the vibrations are enabled
  const { vibrationEnabled } = useVibrationSetting();
  // Import functions that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();
  const { handleLevelCompletedSoundPlay } = useLevelCompletedSound();

  // Information on what box/row is selected by the user
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Stores information if the user completed the level
  const [levelCompleted, setLevelCompleted] = useState(false);

  // This hook determines whether the level was previously completed or not
  // If it was, then the keyboard will not be visible for the user, and so
  // no changes for the given grid can be made
  const [checkIfLevelCompleted, setCheckIfLevelCompleted] = useState(false);

  // Array that stores current user row input
  const inputRefs = useRef([]);

  // Initialize hint counts
  const [hintCount1, setHintCount1] = useState();
  const [hintCount2, setHintCount2] = useState();
  const [hintCount3, setHintCount3] = useState();

  // Load the hint counts from the AsyncStorage and assign them to the useState hooks
  const loadHintCounts = async () => {
    const count1 = await loadHintCount(1);
    const count2 = await loadHintCount(2);
    const count3 = await loadHintCount(3);

    setHintCount1(count1);
    setHintCount2(count2);
    setHintCount3(count3);
  };

  // Variables to determine the cost for particular hint
  const creditsCostHint1 = 15;
  const creditsCostHint2 = 50;
  const creditsCostHint3 = 30;

  // All those hooks and variables are used for the level completed overlay (animations)
  const [fadeAnim] = useState(new Animated.Value(0));
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [displayedPoints, setDisplayedPoints] = useState(levelPoints);
  const [rewardsAnimation] = useState(new Animated.Value(0));
  const [showButton, setShowButton] = useState(false);
  const fadeAnimButton = new Animated.Value(0);
  const [hintsAnimations] = useState([
    new Animated.Value(0), // For hint 1
    new Animated.Value(0), // For hint 2
    new Animated.Value(0), // For hint 3
  ]);

  // Initialise data
  useEffect(() => {
    loadUserInput(); // Load saved user input for the given level
    checkLevelCompletion(); // Check if level is already completed
    initializeHintCounts(); // If the user does not have hintCounts declared - initalise them
    loadHintCounts(); // If the user does have hintCounts declared - load them
  }, []);

  // Update the background image
  useFocusEffect(
    React.useCallback(() => {
      // Load the background image number when the screen gains focus
      getBackgroundImage().then((imageNumber) => {
        const selectedImage = backgroundImagePaths[imageNumber];
        setBackgroundImageSource(selectedImage);
      });
    }, [])
  );

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
      // Left for testing purposes
      // console.log("Error saving user input:", error);
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
      // Left for testing purposes
      // console.log("Error loading user input:", error);
    }
  };

  // Delete the input (if needed)
  const deleteUserInput = async () => {
    try {
      const userInputKey = `userInput:${route.params.levelName}`;
      await AsyncStorage.removeItem(userInputKey);
    } catch (error) {
      // Left for testing purposes
      // console.log("Error deleting user input:", error);
    }
  };

  // Determine which box is selected
  const handleBoxSelection = (rowIndex, columnIndex) => {
    setSelectedBox({ rowIndex, columnIndex });
    setSelectedRow(rowIndex);

    // Declare the side
    setShouldScrollToTheRight(true);

    const boxWidth = windowHeight * 0.07; // Letter box size

    // Calculate the new scroll position to scroll every 4 columns
    const scrollColumnIndex = Math.floor(columnIndex / 4) * 4;
    const scrollX = scrollColumnIndex * boxWidth;

    // Use the scrollTo method to scroll to the new position
    // When input letter, scroll to the right
    if (shouldScrollToTheRight) {
      horizontalScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
      // When using backspace, scroll to the left
    } else {
      horizontalScrollViewRef.current.scrollTo({ x: -scrollX, animated: true });
    }
  };

  // Fill boxes behaviour
  const handleBoxInput = (text, rowIndex, columnIndex) => {
    // Convert input letters to uppercase
    const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
    const inputtedLetter = text.toUpperCase();

    const updateHiddenGrid = () => {
      // Update hiddenGrid state, that is compare the hiddenGrid to the user's letters
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
        if (vibrationEnabled) {
          Vibration.vibrate([500]); // Perform a vibration
        }
        setLevelCompleted(true); // Set this level state to "completed"
        handleLevelCompletedSoundPlay(); // Play sound
      }
    };

    // Update hiddenGrid after a small delay, this way the letter is shown
    setTimeout(updateHiddenGrid, 1);

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

        // Move the selection to the left after pressing the backspace
        const nextColumnIndex = columnIndex - 1;
        if (nextColumnIndex >= 0) {
          handleBoxSelection(rowIndex, nextColumnIndex);
          const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
          nextInputRef && nextInputRef.focus();
        } else {
          // If there is no next input in the same row, you can move to the previous row's last input
          const prevRowIndex = rowIndex - 1;
          if (prevRowIndex >= 0) {
            const lastColumnIndex = inputRefs.current[prevRowIndex].length - 1;
            if (lastColumnIndex >= 0) {
              handleBoxSelection(prevRowIndex, lastColumnIndex);
              const lastInputRef =
                inputRefs.current[prevRowIndex][lastColumnIndex];
              lastInputRef && lastInputRef.focus();
            }
          }
        }
        // Update the scrolling function
        setShouldScrollToTheRight(false);
      } else {
        // If any other key is pressed, handle it as usual
        handleBoxInput(key, rowIndex, columnIndex);
        const currentInputRef = inputRefs.current[rowIndex][columnIndex];
        currentInputRef && currentInputRef.focus();
      }
    }
  };

  // Hint system
  const handleHintPress = async (index) => {
    // Retrieve hint count for the given index
    const hintCount = await loadHintCount(index);

    if (hintCount > 0) {
      // Hint 1 - reveal letter in a specific position
      if (index === 1 && selectedBox) {
        const { rowIndex, columnIndex } = selectedBox;
        const isBoxCorrect = hiddenGrid[rowIndex][columnIndex].isCorrect;

        if (!isBoxCorrect) {
          // Decrement hint count for the given index
          await decrementHintCount(index);
          // Retrieve the updated hint count after decrementing
          const updatedClueCount = await loadHintCount(index);

          // Handle hint 1
          const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
          const newHiddenGrid = [...hiddenGrid];
          newHiddenGrid[rowIndex][columnIndex] = {
            letter: hiddenLetter,
            isCorrect: true,
          };
          setHiddenGrid(newHiddenGrid);
          saveUserInput();
          // Update hint count
          setHintCount1(updatedClueCount);

          // Select the box to the right after the letter was put in a box using this hint
          if (columnIndex < GRID_DATA[rowIndex].length - 1) {
            const nextColumnIndex = columnIndex + 1;
            handleBoxSelection(rowIndex, nextColumnIndex);
            const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
            nextInputRef && nextInputRef.focus();
          }
        } else {
          // Left for testing purposes
          // console.log("Selected box is already correct. Clue not used.");
        }
      }

      // Hint 2 - reveal whole row (all letters)
      if (index === 2 && selectedRow !== null) {
        const isRowCorrect = hiddenGrid[selectedRow].every(
          (box) => box.isCorrect
        );

        if (!isRowCorrect) {
          // Decrement hint count for the given index
          await decrementHintCount(index);
          // Retrieve the updated hint count after decrementing
          const updatedClueCount = await loadHintCount(index);

          // Handle hint 2
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
          // Update hint count
          setHintCount2(updatedClueCount);
        } else {
          // Left for testing purposes
          // console.log("Selected row is already correct. Clue not used.");
        }
      }

      // Hint 3 - reveal two letters in random positions
      if (index === 3 && selectedRow !== null) {
        // Handle hint 3
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
          // Decrement hint count for the given index
          await decrementHintCount(index);

          // Retrieve the updated hint count after decrementing
          const updatedClueCount = await loadHintCount(index);

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
          // Update hint count
          setHintCount3(updatedClueCount);
        } else {
          // Left for testing purposes
          // console.log("Not enough available positions to reveal letters.");
        }
      }

      // Check if all boxes are filled correctly and determine if level is finished
      const isLevelFinished = hiddenGrid.every((row) =>
        row.every((box) => box.isCorrect)
      );

      // When level is finished
      if (isLevelFinished) {
        if (vibrationEnabled) {
          Vibration.vibrate([500]); // Perform vibrations
        }
        setLevelCompleted(true); // Set this level state to "completed"
        handleLevelCompletedSoundPlay(); // Play sound
      }
    } else {
      // Left for testing
      // console.log(`Clue ${index} has no remaining uses.`);
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

  // Function that deals with things after the Level Completed overlay modal is closed
  const closeModal = async () => {
    // After closing the modal declare setLevelCompleted to false to properly close the overlay
    setLevelCompleted(false);
    // Add points on closing the box
    addPoints(levelPoints);
    // Add credits
    addCredits(creditsIncrease);
    // Increment hint count if there were declared for this level
    incrementHintCount(1, hintCount1Increase);
    incrementHintCount(2, hintCount2Increase);
    incrementHintCount(3, hintCount3Increase);

    // Navigate back to the level selection screen with completion status and level name as parameters
    navigation.navigate("GameScreen", {
      levelCompleted: true,
      completedLevelName: levelName,
    });
    // Save the level as completed
    await saveCompletedLevel(levelName);
  };

  //  ---***---
  // Clue overlay is different depending on which hint user wants to buy.
  // Therefore, appropriate data is passed, based on which hint was selected
  // Overlay for hint 1
  const renderBuyHintOverlay1 = hintCount1 === 0 && (
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
  const renderBuyHintOverlay2 = hintCount2 === 0 && (
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
  const renderBuyHintOverlay3 = hintCount3 === 0 && (
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

      // Adjusting steps or interval can change a bit the animation
      const targetPoints = levelPoints + points;
      const steps = 20;
      const stepValue = Math.ceil((targetPoints - levelPoints) / steps);

      interval = setInterval(() => {
        if (displayedPoints < targetPoints) {
          setDisplayedPoints((prevPoints) =>
            Math.min(prevPoints + stepValue, targetPoints)
          );
        } else {
          clearInterval(interval);
        }
      }, 2); // Interval
    }

    return () => {
      clearInterval(interval); // Clear the interval when the animation is finished
    };
  }, [levelCompleted]);

  // Used for opacity animation, for the "Total points" text
  useEffect(() => {
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

  // Animations for hint icons. They are "poping up"
  useEffect(() => {
    let delay = 100; // Initial delay for the first hint

    if (levelCompleted) {
      if (hintCount1Increase !== 0) {
        // Start animation for hint 1
        Animated.timing(hintsAnimations[0], {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }).start();

        delay += 300; // Add delay for the next hint
      }

      if (hintCount2Increase !== 0) {
        // Start animation for hint 2
        Animated.timing(hintsAnimations[1], {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }).start();

        delay += 300; // Add delay for the next hint
      }

      if (hintCount3Increase !== 0) {
        // Start animation for hint 3
        Animated.timing(hintsAnimations[2], {
          toValue: 1,
          duration: 300,
          delay,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [
    levelCompleted,
    hintCount1Increase,
    hintCount2Increase,
    hintCount3Increase,
    hintsAnimations,
  ]);

  // Delay to show the go back button, after all other animations are finished
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
      const timeout = setTimeout(startAnimation, 200);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [levelCompleted, fadeAnimButton]);

  return (
    // Container so everything is displayed properly with loading screen implementation
    <View style={styles.containerWhole}>
      {/* Display the screen after Loading Screen is finished */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <ImageBackground
          source={backgroundImageSource}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <CustomHeader
              title={levelName} // import the level name to the header
            />
            {/* Grid */}
            <ScrollView
              horizontal
              ref={horizontalScrollViewRef}
              showsHorizontalScrollIndicator={false} // Set this to false to hide horizontal scrollbar
            >
              <ScrollView
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false} // Set this to false to hide vertical scrollbar
              >
                {/* Clear the input if there was saved something */}
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

                        // Left for testing
                        // const hiddenLetter =
                        //   GRID_DATA[rowIndex][columnIndex].toUpperCase();
                        const inputtedLetter =
                          hiddenGrid[rowIndex][columnIndex]?.letter;

                        const isLetterCorrect =
                          hiddenGrid[rowIndex][columnIndex]?.isCorrect || false;

                        return (
                          <TouchableOpacity
                            key={columnIndex}
                            style={[
                              // Change the colour of the box depending on the state
                              styles.box,
                              isBoxSelected && { backgroundColor: "yellow" },
                              isLetterCorrect && { backgroundColor: "#9ec4e8" },
                            ]}
                            onPress={() =>
                              handleBoxSelection(rowIndex, columnIndex)
                            }
                          >
                            {/* Make sure that user can input only one letter for each box */}
                            {isBoxSelected ? (
                              <TextInput
                                style={styles.boxText}
                                maxLength={1}
                                value={inputtedLetter}
                                onChangeText={(text) =>
                                  handleBoxInput(text, rowIndex, columnIndex)
                                }
                                ref={(ref) =>
                                  (inputRefs.current[rowIndex][columnIndex] =
                                    ref)
                                }
                                autoFocus={true}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                  if (
                                    columnIndex <
                                    GRID_DATA[rowIndex].length - 1
                                  ) {
                                    const nextInputRef =
                                      inputRefs.current[rowIndex][
                                        columnIndex + 1
                                      ];
                                    nextInputRef && nextInputRef.focus();
                                  }
                                }}
                                {...disableBuiltInKeyboard()}
                              />
                            ) : (
                              <Text style={styles.boxText}>
                                {hiddenGrid[rowIndex][columnIndex]?.letter ||
                                  ""}
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
                {/* Display the clue for particular row */}
                <Text style={styles.clueText}>{ROW_CLUES[selectedRow]}</Text>
                <View style={styles.hintButtonsContainer}>
                  {/* Hint 1 */}
                  <TouchableOpacity
                    style={styles.hintButton}
                    onPress={() =>
                      hintCount1 === 0
                        ? setShowBuyHintOverlay1(true)
                        : handleHintPress(1)
                    }
                  >
                    {/* Render Buy Hint overlay */}
                    {renderBuyHintOverlay1}
                    <View style={styles.rowDirectionContainer}>
                      {/* Render the icon */}
                      <Image
                        source={require("../assets/hint1-mag-glass.png")}
                        style={styles.hintImage}
                      />

                      {/* Clue count container */}
                      <View style={styles.hintCountContainer}>
                        <Text style={styles.hintCountText}>{hintCount1}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* Hint 2 */}
                  <TouchableOpacity
                    style={styles.hintButton}
                    onPress={() =>
                      hintCount2 === 0
                        ? setShowBuyHintOverlay2(true)
                        : handleHintPress(2)
                    }
                  >
                    {/* Render Buy Hint overlay */}
                    {renderBuyHintOverlay2}
                    <View style={styles.rowDirectionContainer}>
                      {/* Render the icon */}
                      <Image
                        source={require("../assets/hint2-bulb.png")}
                        style={styles.hintImage}
                      />

                      {/* Clue count container */}
                      <View style={styles.hintCountContainer}>
                        <Text style={styles.hintCountText}>{hintCount2}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* Hint 3 */}
                  <TouchableOpacity
                    style={styles.hintButton}
                    onPress={() =>
                      hintCount3 === 0
                        ? setShowBuyHintOverlay3(true)
                        : handleHintPress(3)
                    }
                  >
                    {/* Render Buy Hint overlay */}
                    {renderBuyHintOverlay3}
                    <View style={styles.rowDirectionContainer}>
                      {/* Render the icon */}
                      <Image
                        source={require("../assets/hint3-dice.png")}
                        style={styles.hintImage}
                      />

                      {/* Clue count container */}
                      <View style={styles.hintCountContainer}>
                        <Text style={styles.hintCountText}>{hintCount3}</Text>
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
                      <Text style={styles.scoreTextValue}>
                        {displayedPoints}
                      </Text>
                    </View>
                    {/* Rewards section */}
                    <Text style={styles.rewardsTitleText}>Rewards</Text>
                    <View style={styles.rowDirectionContainer}>
                      {/* Animation for the credits */}
                      <Animated.Image
                        source={require("../assets/credits.png")}
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
                    {/* Depending whether for given level user can get hints as rewards */}
                    {/* Make sure only those declared are presented */}
                    <View
                      style={[
                        styles.rowDirectionContainer,
                        (hintCount1Increase !== 0 ||
                          hintCount2Increase !== 0 ||
                          hintCount3Increase !== 0) &&
                          styles.hintsBackground,
                        { marginTop: 5 },
                      ]}
                    >
                      {/* Hint 1 increase */}
                      {hintCount1Increase !== 0 && (
                        <Animated.View
                          style={[
                            styles.imageSpacing,
                            {
                              opacity: hintsAnimations[0],
                              transform: [
                                {
                                  translateY: hintsAnimations[0].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <Image
                            source={require("../assets/hint1-mag-glass.png")}
                            style={styles.hintImage}
                          />
                          <Text style={styles.hintText}>
                            x{hintCount1Increase}
                          </Text>
                        </Animated.View>
                      )}
                      {/* Hint 2 increase */}
                      {hintCount2Increase !== 0 && (
                        <Animated.View
                          style={[
                            styles.imageSpacing,
                            {
                              opacity: hintsAnimations[1],
                              transform: [
                                {
                                  translateY: hintsAnimations[1].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <Image
                            source={require("../assets/hint2-bulb.png")}
                            style={styles.hintImage}
                          />
                          <Text style={styles.hintText}>
                            x{hintCount2Increase}
                          </Text>
                        </Animated.View>
                      )}
                      {/* Hint 3 increase */}
                      {hintCount3Increase !== 0 && (
                        <Animated.View
                          style={[
                            styles.imageSpacing,
                            {
                              opacity: hintsAnimations[2],
                              transform: [
                                {
                                  translateY: hintsAnimations[2].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <Image
                            source={require("../assets/hint3-dice.png")}
                            style={styles.hintImage}
                          />
                          <Text style={styles.hintText}>
                            x{hintCount3Increase}
                          </Text>
                        </Animated.View>
                      )}
                    </View>

                    {/* Button to close the modal and confirm completing the level */}
                    {showButton && (
                      <Animated.View style={{ opacity: fadeAnimButton }}>
                        <TouchableOpacity
                          style={styles.goBackButton}
                          onPress={() => {
                            handleButtonSoundPlay();
                            closeModal();
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
        </ImageBackground>
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
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gridContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  highlightedRow: {
    backgroundColor: "rgb(84, 68, 55)",
    paddingVertical: 2,
    borderRadius: 8,
  },
  box: {
    width: windowHeight * 0.07,
    height: windowHeight * 0.07,
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
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: "#CE8B53",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#9b673a",
  },
  clueText: {
    fontSize: windowHeight * 0.025,
    alignSelf: "center",
    fontFamily: "AppFont",
  },
  hintButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  hintButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: windowHeight * 0.01,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  rowDirectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  hintImage: {
    width: 32,
    height: 32,
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
  },
  hintCountContainer: {
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
  hintCountText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 3,
    fontFamily: "AppFontBold",
  },
  iconContainer: {
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
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hintsBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(166, 166, 166)",
    padding: 10,
    borderRadius: 10,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
