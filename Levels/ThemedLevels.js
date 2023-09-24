import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { loadCompletedLevels } from "../AsyncStorageUtils";
import CustomHeader from "../CustomHeader";
import LevelScreen from "../Screens/LevelScreen";

// Get the height of the device
// https://reactnative.dev/docs/dimensions
const windowHeight = Dimensions.get("window").height;

const HardLevelsScreen = ({ navigation }) => {
  // Define colours used for the Themed levels
  const ThemedLevelsColorBackground = "rgb(135, 0, 255)";
  const ThemedLevelsColorBackgroundCompleted = "rgb(100, 0, 255)";
  const ThemedLevelsColorOutline = "rgb(95, 0, 204)";
  const ThemedLevelsColorOutlineCompleted = "rgb(90, 0, 153)";

  // Declare state for completed levels
  const [completedLevels, setCompletedLevels] = useState([]);

  // Load completed levels on component mount
  useEffect(() => {
    const loadCompletedLevelsData = async () => {
      const levels = await loadCompletedLevels();
      setCompletedLevels(levels);
    };
    loadCompletedLevelsData();
  }, []);

  // Define level data
  // All levels pass this information:
  // * levelName, levelPoints,
  // * color, hintCount1Increase, hintCount2Increase, hintCount3Increase,
  // * creditsIncrease, GRID_DATA, ROW_CLUES
  // Clues were written with a help of ChatGPT
  const levels = [
    {
      levelName: "T1 \nAnimals",
      levelPoints: 25,
      hintCount1Increase: 1,
      hintCount2Increase: 0,
      hintCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["T", "I", "G", "E", "R"],
        ["S", "E", "A", "H", "O", "R", "S", "E"],
        ["O", "C", "T", "O", "P", "U", "S"],
        ["E", "L", "E", "P", "H", "A", "N", "T"],
        ["C", "R", "O", "C", "O", "D", "I", "L", "E"],
        ["D", "O", "G"],
        ["P", "E", "N", "G", "U", "I", "N"],
        ["S", "Q", "U", "I", "R", "R", "E", "L"],
      ],

      ROW_CLUES: [
        "1. Striped feline known for its strength and agility.",
        "2. Tiny marine fish with a unique upright posture.",
        "3. Eight-armed sea creature with incredible intelligence.",
        "4. Largest land mammal, known for its trunk and tusks.",
        "5. Large reptile with a powerful jaw, found in rivers.",
        "6. It is said, a man's best friend",
        "7. Flightless bird found in Antarctica.",
        "8. Small, bushy-tailed rodent known for hoarding nuts.",
      ],
    },
    {
      levelName: "T2 \nPlants",
      levelPoints: 30,
      hintCount1Increase: 1,
      hintCount2Increase: 1,
      hintCount3Increase: 0,
      creditsIncrease: 25,
      GRID_DATA: [
        ["R", "O", "S", "E"],
        ["T", "U", "L", "I", "P"],
        ["C", "A", "C", "T", "U", "S"],
        ["R", "E", "D", "W", "O", "O", "D"],
        ["L", "A", "V", "E", "N", "D", "E", "R"],
        ["O", "R", "C", "H", "I", "D"],
        ["D", "A", "N", "D", "E", "L", "I", "O", "N"],
        ["F", "E", "R", "N"],
      ],
      ROW_CLUES: [
        "1. Fragrant flower known for its beauty.",
        "2. Colorful, cup-shaped springtime flower.",
        "3. Desert plant with spines and succulent stems.",
        "4. Massive tree species known for its height.",
        "5. Large reptile with a powerful jaw, found in rivers.",
        "6. Exotic flower prized for its elegance.",
        "7. Common weed with yellow flowers and fluffy seeds.",
        "8. Leafy green plant often found in forests.",
      ],
    },
    {
      levelName: "T3 \nVideo Games",
      levelPoints: 20,
      hintCount1Increase: 0,
      hintCount2Increase: 0,
      hintCount3Increase: 2,
      creditsIncrease: 30,
      GRID_DATA: [
        ["M", "A", "R", "I", "O"],
        ["Z", "E", "L", "D", "A"],
        ["F", "O", "R", "T", "N", "I", "T", "E"],
        ["S", "K", "Y", "R", "I", "M"],
        ["M", "I", "N", "E", "C", "R", "A", "F", "T"],
        ["T", "E", "T", "R", "I", "S"],
        ["H", "A", "L", "O"],
        ["D", "I", "A", "B", "L", "O"],
        ["P", "O", "R", "T", "A", "L"],
      ],
      ROW_CLUES: [
        "1. Plumber who battles villains in the Mushroom Kingdom.",
        "2. Princess and adventurer in a legendary fantasy series.",
        "3. Popular battle royale game with building mechanics.",
        "4. Open-world fantasy RPG with dragons and epic quests.",
        "5. Sandbox game where players build and explore.",
        "6. Block-stacking puzzle game from Russia.",
        "7. Sci-fi shooter featuring Master Chief.",
        "8. Action role-playing game with dark fantasy themes.",
        "9. Puzzle-platformer with teleportation mechanics.",
      ],
    },
    {
      levelName: "T4 \nSport",
      levelPoints: 25,
      hintCount1Increase: 1,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 35,
      GRID_DATA: [
        ["F", "O", "O", "T", "B", "A", "L", "L"],
        ["T", "E", "N", "N", "I", "S"],
        ["B", "A", "S", "E", "B", "A", "L", "L"],
        ["S", "W", "I", "M", "M", "I", "N", "G"],
        ["C", "Y", "C", "L", "I", "N", "G"],
        ["G", "O", "L", "F"],
        ["B", "A", "D", "M", "I", "N", "T", "O", "N"],
        ["N", "A", "A", "C", "A", "R"],
        ["B", "I", "A", "T", "H", "L", "O", "N"],
      ],
      ROW_CLUES: [
        "1. The world's most popular sport, played with a ball and goalposts.",
        "2. Racket sport played on a rectangular court.",
        "3. Bat-and-ball game with bases and innings.",
        "4. Activity of moving through water using strokes.",
        "5. Sport involving riding bicycles in races or tours.",
        "6. Precision club-and-ball sport played on a course.",
        "7. Racket sport played with a shuttlecock.",
        "8. Stock car racing series popular in the United States.",
        "9. Winter sport combining skiing and rifle shooting.",
      ],
    },
    {
      levelName: "T5 \nCharacters",
      levelPoints: 25,
      hintCount1Increase: 1,
      hintCount2Increase: 1,
      hintCount3Increase: 0,
      creditsIncrease: 30,
      GRID_DATA: [
        ["S", "I", "M", "B", "A"],
        ["E", "L", "S", "A"],
        ["S", "H", "R", "E", "K"],
        ["A", "R", "I", "E", "L"],
        ["R", "A", "P", "U", "N", "Z", "E", "L"],
        ["N", "E", "M", "O"],
        ["P", "U", "M", "B", "A", "A"],
        ["P", "U", "S", "S"],
        ["A", "L", "A", "D", "D", "I", "N"],
        ["W", "O", "O", "D", "Y"],
      ],
      ROW_CLUES: [
        "1. Lion who becomes king.",
        "2. Snow queen with ice powers.",
        "3. Most popular ogre of all time.",
        "4. Red-haired mermaid.",
        "5. Princess with long, blond hair.",
        "6. Clownfish in search of his family.",
        "7. Very good friend of Timon.",
        "8. Clever, sword-fighting cat.",
        "9. Hero, who finds a magical lamp.",
        "10. Cowboy doll.",
      ],
    },
    {
      levelName: "T6 \nCars",
      levelPoints: 30,
      hintCount1Increase: 1,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 40,
      GRID_DATA: [
        ["T", "E", "S", "L", "A"],
        ["F", "E", "R", "R", "A", "R", "I"],
        ["C", "A", "M", "A", "R", "O"],
        ["T", "O", "Y", "O", "T", "A"],
        ["A", "U", "D", "I"],
        ["C", "I", "V", "I", "C"],
        ["H", "Y", "U", "N", "D", "A", "I"],
        ["W", "R", "A", "N", "G", "L", "E", "R"],
        ["A", "M", "G"],
        ["M", "U", "S", "T", "A", "N", "G"],
      ],
      ROW_CLUES: [
        "1. Electric car manufacturer led by Elon Musk.",
        "2. Italian sports car manufacturer with a horse in its logo.",
        "3. Chevrolet's high-performance muscle car.",
        "4. Very popular Japanese car manufacturer.",
        "5. Producers of most iconic Quattro",
        "6. Compact car model by Honda.",
        "7. South Korean manufacturer known for a wide range of vehicles.",
        "8. Rugged off-road SUV by Jeep.",
        "9. High-performance division of Mercedes-Benz.",
        "10. Iconic American muscle car by Ford.",
      ],
    },
    {
      levelName: "T7 \nMarvel",
      levelPoints: 25,
      hintCount1Increase: 0,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 40,
      GRID_DATA: [
        ["T", "H", "O", "R"],
        ["H", "U", "L", "K"],
        ["A", "V", "E", "N", "G", "E", "R", "S"],
        ["W", "A", "K", "A", "N", "D", "A"],
        ["I", "R", "O", "N"],
        ["L", "O", "K", "I"],
        ["S", "T", "R", "A", "N", "G", "E"],
        ["T", "H", "A", "N", "O", "S"],
        ["D", "E", "A", "D", "P", "O", "O", "L"],
      ],
      ROW_CLUES: [
        "1. Norse god of thunder and wielder of Mjolnir.",
        "2. Green-skinned scientist with incredible strength.",
        "3. Team of superheroes assembled to save the world.",
        "4. Fictional African nation known for its advanced technology.",
        "5. ...-Man - billionaire and philanthropist.",
        "6. Trickster god and frequent antagonist of Thor.",
        "7. Doctor with mastery over mystic arts and time manipulation.",
        "8. Powerful villain obsessed with collecting Infinity Stones.",
        "9. Mercenary anti-hero known for breaking the fourth wall.",
      ],
    },
    {
      levelName: "T8 \nMusic",
      levelPoints: 30,
      hintCount1Increase: 0,
      hintCount2Increase: 1,
      hintCount3Increase: 2,
      creditsIncrease: 35,
      GRID_DATA: [
        ["R", "O", "L", "L", "I", "N", "G"],
        ["Q", "U", "E", "E", "N"],
        ["R", "H", "Y", "T", "H", "M"],
        ["J", "A", "Z", "Z"],
        ["G", "U", "I", "T", "A", "R"],
        ["S", "Y", "M", "P", "H", "O", "N", "Y"],
        ["B", "E", "A", "T", "L", "E", "S"],
        ["N", "I", "R", "V", "A", "N", "A"],
      ],
      ROW_CLUES: [
        "1. ... Stones.",
        "2. The singer has the name of the smallest and closest to the sun planet of the solar system.",
        "3. Pattern of beats or time in music.",
        "4. Genre of music characterized by improvisation and syncopation.",
        "5. Stringed musical instrument often played with fingers or a pick.",
        "6. Elaborate musical composition for a full orchestra.",
        "7. Iconic British rock band with members like John Lennon and Paul McCartney.",
        "8. Influential grunge band led by Kurt Cobain.",
      ],
    },
    {
      levelName: "T9 \nMovies",
      levelPoints: 25,
      hintCount1Increase: 1,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["T", "I", "T", "A", "N", "I", "C"],
        ["J", "U", "R", "A", "S", "S", "I", "C"],
        ["A", "V", "A", "T", "A", "R"],
        ["S", "E", "Q", "U", "E", "L"],
        ["O", "S", "C", "A", "R"],
        ["H", "O", "L", "L", "Y", "W", "O", "O", "D"],
        ["M", "A", "T", "R", "I", "X"],
        ["R", "O", "C", "K", "Y"],
        ["D", "I", "R", "E", "C", "T", "O", "R"],
        ["T", "A", "R", "A", "N", "T", "I", "N", "O"],
      ],
      ROW_CLUES: [
        "1. Epic romance and disaster film directed by James Cameron.",
        "2. ... Park. Film series featuring genetically-engineered dinosaurs.",
        "3. Have the biggest box office of all time.",
        "4. Follow-up movie that continues a previous story.",
        "5. Prestigious film award presented annually.",
        "6. Iconic district in Los Angeles known for the film industry.",
        "7. Sci-fi series with a virtual reality and cyberpunk theme.",
        "8. Sports drama starring Sylvester Stallone as a boxer.",
        "9. Person responsible for guiding the making of a film.",
        "10. Quentin - director of `Pulp Fiction`",
      ],
    },
    {
      levelName: "T10 \nTechnology",
      levelPoints: 30,
      hintCount1Increase: 3,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["A", "L", "G", "O", "R", "I", "T", "H", "M"],
        ["I", "N", "T", "E", "R", "N", "E", "T"],
        ["R", "O", "B", "O", "T", "I", "C", "S"],
        ["S", "M", "A", "R", "T", "P", "H", "O", "N", "E"],
        ["I", "N", "N", "O", "V", "A", "T", "I", "O", "N"],
        ["B", "I", "O", "M", "E", "T", "R", "I", "C", "S"],
        ["D", "R", "O", "N", "E"],
        ["D", "A", "T", "A", "B", "A", "S", "E"],
        ["M", "A", "L", "W", "A", "R", "E"],
        ["P", "A", "S", "S", "W", "O", "R", "D"],
      ],
      ROW_CLUES: [
        "1. Step-by-step procedure or set of rules for solving problems.",
        "2. Global network connecting computers and information.",
        "3. Field of technology involving the design and creation of robots.",
        "4. You are probably using it right now to play this game.",
        "5. Introduction of new ideas, methods, or technologies.",
        "6. Authentication based on unique physical or behavioral traits.",
        "7. Unmanned aerial vehicle controlled remotely.",
        "8. Structured collection of data organized for easy retrieval.",
        "9. Software designed to harm or exploit computer systems.",
        "10. Secret code used for user authentication and data protection.",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Themed Levels" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          // Hide the scrollbars
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={levels}
          testID="level-screen"
          renderItem={({ item }) => (
            <LevelScreen
              // Pass all info to the LevelScreen component
              levelName={item.levelName}
              color={ThemedLevelsColorBackground}
              completedColor={ThemedLevelsColorBackgroundCompleted}
              outlineColor={ThemedLevelsColorOutline}
              completedOutlineColor={ThemedLevelsColorOutlineCompleted}
              completedLevels={completedLevels}
              GRID_DATA={item.GRID_DATA}
              ROW_CLUES={item.ROW_CLUES}
              levelPoints={item.levelPoints}
              hintCount1Increase={item.hintCount1Increase}
              hintCount2Increase={item.hintCount2Increase}
              hintCount3Increase={item.hintCount3Increase}
              creditsIncrease={item.creditsIncrease}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.levelName}
          numColumns={2}
          columnWrapperStyle={styles.column}
        />
        {/* Make a spacing at the bottom, to make sure all buttons are accesible */}
        <View
          style={{
            marginBottom: windowHeight * 0.27,
          }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(151, 0, 255, 0.3)",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HardLevelsScreen;
