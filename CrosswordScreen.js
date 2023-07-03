import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";

import CustomKeyboard from "./CustomKeyboard";

const CrosswordApp = ({ route }) => {
  const { GRID_DATA, ROW_CLUES } = route.params;
  const [hiddenGrid, setHiddenGrid] = useState(() =>
    GRID_DATA.map((row) => row.map(() => ""))
  );
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const inputRefs = useRef([]);

  const handleBoxSelection = (rowIndex, columnIndex) => {
    setSelectedBox({ rowIndex, columnIndex });
    setSelectedRow(rowIndex);
  };

  const handleBoxInput = (text, rowIndex, columnIndex) => {
    const hiddenLetter = GRID_DATA[rowIndex][columnIndex].toUpperCase();
    const inputtedLetter = text.toUpperCase();

    const updateHiddenGrid = () => {
      const newHiddenGrid = [...hiddenGrid];
      newHiddenGrid[rowIndex][columnIndex] = {
        letter: inputtedLetter,
        isCorrect: inputtedLetter === hiddenLetter,
      };
      setHiddenGrid(newHiddenGrid);
    };

    clearTimeout(inputRefs.current[rowIndex][columnIndex].timer);
    inputRefs.current[rowIndex][columnIndex].timer = setTimeout(
      updateHiddenGrid,
      300
    );

    // Select the box to the right
    if (columnIndex < GRID_DATA[rowIndex].length - 1) {
      const nextColumnIndex = columnIndex + 1;
      handleBoxSelection(rowIndex, nextColumnIndex);
      const nextInputRef = inputRefs.current[rowIndex][nextColumnIndex];
      nextInputRef && nextInputRef.focus();
    }
  };

  const handleKeyPress = (key) => {
    if (selectedBox) {
      const { rowIndex, columnIndex } = selectedBox;
      handleBoxInput(key, rowIndex, columnIndex);
      inputRefs.current[rowIndex][columnIndex].focus();
    }
  };

  const disableBuiltInKeyboard = () => {
    if (Platform.OS === "ios") {
      return { editable: false };
    } else {
      return { editable: false, pointerEvents: "none" };
    }
  };

  return (
    <View style={styles.container}>
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
                        isLetterCorrect && { backgroundColor: "blue" },
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

      {selectedRow !== null && (
        <Text style={styles.clueText}>Clue: {ROW_CLUES[selectedRow]}</Text>
      )}

      <CustomKeyboard onKeyPress={handleKeyPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  highlightedRow: {
    backgroundColor: "rgba(0, 128, 0, 0.5)",
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    padding: 5,
  },
  boxText: {
    fontSize: 16,
  },
  clueText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default CrosswordApp;
