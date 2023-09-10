import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { loadCompletedLevels } from "../AsyncStorageUtils";
import CustomHeader from "../CustomHeader";
import LevelScreen from "../Screens/LevelScreen";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const HardLevelsScreen = ({ navigation }) => {
  // Define colours used for the Hard levels
  const HardLevelsColorBackground = "rgb(255, 143, 0)";
  const HardLevelsColorBackgroundCompleted = "rgb(177, 98, 0)";
  const HardLevelsColorOutline = "rgb(204, 114, 0)";
  const HardLevelsColorOutlineCompleted = "rgb(163, 70, 0)";

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
  const levels = [
    {
      levelName: "H1",
      color: HardLevelsColorBackground,
      levelPoints: 31,
      hintCount1Increase: 2,
      hintCount2Increase: 0,
      hintCount3Increase: 2,
      creditsIncrease: 40,
      GRID_DATA: [
        ["Q", "U", "A", "S", "A", "R"],
        ["P", "A", "R", "A", "D", "O", "X"],
        ["A", "L", "G", "O", "R", "I", "T", "H", "M"],
        ["P", "A", "L", "I", "N", "D", "R", "O", "M", "E"],
        ["P", "A", "R", "A", "B", "O", "L", "A"],
      ],

      ROW_CLUES: [
        "1. British crime drama TV series, starring Cillian Murphy.",
        "2. A statement that contradicts itself but may be true.",
        "3. Step-by-step procedure or set of rules for solving problems.",
        "4. A word or phrase that reads the same forwards and backwards.",
        "5. A U-shaped curve in mathematics.",
      ],
    },
    {
      levelName: "H2",
      color: HardLevelsColorBackground,
      levelPoints: 33,
      hintCount1Increase: 2,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["A", "N", "A", "C", "H", "R", "O", "N", "I", "S", "M"],
        ["N", "E", "B", "U", "L", "O", "U", "S"],
        ["E", "N", "N", "U", "I"],
        ["C", "A", "C", "O", "P", "H", "O", "N", "Y"],
        ["Q", "U", "I", "X", "O", "T", "I", "C"],
      ],

      ROW_CLUES: [
        "1. Something that is out of its proper time period.",
        "2. Hazy, unclear, or lacking definite form.",
        "3. A feeling of listlessness and dissatisfaction.",
        "4. A harsh, discordant mixture of sounds.",
        "5. Exceedingly idealistic and unrealistic, which are not practical or likely to succeed.",
      ],
    },
    {
      levelName: "H3",
      color: HardLevelsColorBackground,
      levelPoints: 30,
      hintCount1Increase: 4,
      hintCount2Increase: 0,
      hintCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["A", "B", "E", "R", "R", "R", "A", "N", "T"],
        ["E", "T", "H", "E", "R", "E", "A", "L"],
        ["P", "A", "R", "O", "X", "Y", "S", "M"],
        ["P", "A", "N", "T", "H", "E", "O", "N"],
        ["Q", "U", "A", "D", "R", "I", "C", "E", "P", "S"],
      ],

      ROW_CLUES: [
        "1. Departing from the usual or normal course.",
        "2. Extremely delicate and light, as if from another world.",
        "3. A sudden, violent outburst or fit of emotion.",
        "4. In the art of ancient Greece and ancient Rome - a temple dedicated to all gods.",
        "5. A group of muscles at the front of the thigh.",
      ],
    },
    {
      levelName: "H4",
      color: HardLevelsColorBackground,
      levelPoints: 34,
      hintCount1Increase: 0,
      hintCount2Increase: 0,
      hintCount3Increase: 3,
      creditsIncrease: 25,
      GRID_DATA: [
        ["C", "Y", "B", "E", "R", "P", "U", "N", "K"],
        ["A", "B", "E", "R", "R", "A", "T", "I", "O", "N"],
        ["I", "N", "S", "C", "R", "U", "T", "A", "B", "L", "E"],
        ["X", "E", "R", "O", "P", "H", "Y", "T", "E"],
        ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
      ],

      ROW_CLUES: [
        "1. A genre of science fiction that often features a dystopian future, advanced technology, and cybernetics.",
        "2. A departure from what is normal or expected.",
        "3. Impossible to understand or interpret.",
        "4. A plant adapted to survive in arid conditions.",
        "5. Sweet, brown treat made from cacao beans.",
      ],
    },
    {
      levelName: "H5",
      color: HardLevelsColorBackground,
      levelPoints: 29,
      hintCount1Increase: 0,
      hintCount2Increase: 2,
      hintCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["A", "L", "A", "C", "R", "I", "C", "I", "T", "Y"],
        ["P", "A", "R", "A", "G", "O", "N"],
        ["C", "A", "M", "E", "R", "O", "N"],
        ["P", "H", "O", "T", "O", "S", "H", "O", "P"],
        ["M", "I", "C", "R", "O", "P", "H", "O", "N", "E"],
      ],

      ROW_CLUES: [
        "1. Brisk and cheerful readiness or eagerness.",
        "2. A departure from what is normal or expected.",
        "3. James ... - director of `Avatar`",
        "4. Popular image editing software.",
        "5. Device for capturing and amplifying sound.",
      ],
    },
    {
      levelName: "H6",
      color: HardLevelsColorBackground,
      levelPoints: 30,
      hintCount1Increase: 2,
      hintCount2Increase: 1,
      hintCount3Increase: 0,
      creditsIncrease: 30,
      GRID_DATA: [
        ["J", "A", "L", "A", "P", "E", "N", "O"],
        ["E", "S", "C", "H", "A", "T", "O", "N"],
        ["W", "A", "N", "G", "L", "E", "R"],
        ["N", "E", "F", "A", "R", "I", "O", "U", "S"],
        ["M", "E", "R", "C", "E", "D", "E", "S"],
        ["D", "E", "O", "D", "O", "R", "A", "N", "T"],
      ],

      ROW_CLUES: [
        "1. A spicy chili pepper often used in Mexican cuisine.",
        "2. A departure from what is normal or expected.",
        "3. A person who handles or manages livestock, especially cattle or horses. Also a popular clothing brand.",
        "4. Wicked, villainous, or infamous.",
        "5. German automobile manufacturer known for luxury vehicles.",
        "6. Personal care product used to control body odor",
      ],
    },
    {
      levelName: "H7",
      color: HardLevelsColorBackground,
      levelPoints: 33,
      hintCount1Increase: 1,
      hintCount2Increase: 1,
      hintCount3Increase: 2,
      creditsIncrease: 20,
      GRID_DATA: [
        ["H", "Y", "D", "R", "O", "X", "Y"],
        ["L", "E", "X", "I", "C", "A", "L"],
        ["O", "V", "E", "R", "J", "O", "Y"],
        ["O", "Z", "O", "N", "I", "U", "M"],
        ["W", "H", "A", "C", "K", "E", "D"],
      ],

      ROW_CLUES: [
        "1. A chemical group consisting of hydrogen and oxygen atoms.",
        "2. Relating to vocabulary or words, often used in linguistic contexts.",
        "3. To be extremely happy or elated.",
        "4. A positively charged oxygen ion with three atoms.",
        "5. Hit or struck forcefully.",
      ],
    },
    {
      levelName: "H8",
      color: HardLevelsColorBackground,
      levelPoints: 35,
      hintCount1Increase: 3,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["O", "R", "P", "H", "E", "U", "S"],
        ["M", "U", "F", "F", "L", "E", "R"],
        ["M", "A", "L", "E", "V", "O", "L", "E", "N", "T"],
        ["A", "S", "S", "A", "S", "I", "N"],
        ["B", "A", "S", "T", "E", "T"],
      ],

      ROW_CLUES: [
        "1. Mythical musician and poet in Greek mythology known for his journey to the underworld to rescue his beloved Eurydice.",
        "2. An automotive device used to reduce noise from an engine's exhaust.",
        "3. Having or showing a desire to harm others.",
        "4. A person who carries out the secretive and often political act of murder for hire.",
        "5. An ancient Egyptian goddess often depicted as a lioness or with a lioness head.",
      ],
    },
    {
      levelName: "H9",
      color: HardLevelsColorBackground,
      levelPoints: 32,
      hintCount1Increase: 3,
      hintCount2Increase: 1,
      hintCount3Increase: 1,
      creditsIncrease: 30,
      GRID_DATA: [
        ["H", "A", "W", "K", "I", "S", "H"],
        ["S", "C", "H", "U", "M", "A", "C", "H", "E", "R"],
        ["G", "I", "G", "A", "B", "Y", "T", "E"],
        ["P", "H", "O", "T", "O", "V", "O", "L", "T", "A", "I", "C", "S"],
        ["P", "Y", "R", "A", "M", "I", "D", "S"],
      ],

      ROW_CLUES: [
        "1. Having an aggressive or warlike attitude.",
        "2. Famous German Formula 1 racing driver.",
        "3. A unit of digital information storage, approximately equal to one billion bytes.",
        "4. The technology that converts sunlight into electricity, often used in solar panels.",
        "5. Architectural structures with triangular sides, often associated with ancient Egypt.",
      ],
    },
    {
      levelName: "H10",
      color: HardLevelsColorBackground,
      levelPoints: 33,
      hintCount1Increase: 2,
      hintCount2Increase: 2,
      hintCount3Increase: 2,
      creditsIncrease: 20,
      GRID_DATA: [
        ["A", "V", "I", "A", "T", "I", "O", "N"],
        ["P", "E", "N", "T", "A", "G", "O", "N"],
        ["S", "Y", "C", "O", "P", "H", "A", "N", "T", "I", "C"],
        ["A", "P", "O", "C", "R", "Y", "P", "H", "A", "L"],
        ["W", "H", "I", "S", "K", "E", "Y"],
        ["B", "O", "R", "D", "E", "R", "L", "A", "N", "D", "S"],
      ],

      ROW_CLUES: [
        "1. The design, development, and operation of aircraft and related technology.",
        "2. A five-sided geometric shape, or the headquarters of the United States Department of Defense",
        "3. Excessively fawning or obedient to authority.",
        "4. Of doubtful authenticity, although widely circulated as being true.",
        "5. Spirit distilled from grains, often aged in wooden barrels",
        "6. A popular video game series known for its post-apocalyptic setting and action role-playing gameplay.",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Hard Levels" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          // Hide the scrollbars
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={levels}
          renderItem={({ item }) => (
            <LevelScreen
              // Pass all info to the LevelScreen component
              levelName={item.levelName}
              color={HardLevelsColorBackground}
              completedColor={HardLevelsColorBackgroundCompleted}
              outlineColor={HardLevelsColorOutline}
              completedOutlineColor={HardLevelsColorOutlineCompleted}
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
    backgroundColor: "rgba(255, 160, 0, 0.4)",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HardLevelsScreen;
