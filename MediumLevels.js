import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import CustomHeader from "./CustomHeader";
import { loadCompletedLevels } from "./AsyncStorageUtils";
import LevelScreen from "./LevelScreen"; // Import the LevelButton component

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const MediumLevelsScreen = ({ navigation }) => {
  // Define color constants
  const MediumLevelsColorBackground = "rgba(246,197,58,1)";
  const MediumLevelsColorBackgroundCompleted = "rgba(195, 156, 45, 1)";
  const MediumLevelsColorOutline = "rgba(205,165,49,1)";
  const MediumLevelsColorOutlineCompleted = "rgba(154, 123, 37,1)";

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
  const levels = [
    {
      levelName: "M1",
      color: MediumLevelsColorBackground,
      levelPoints: 17,
      clueCount1Increase: 2,
      clueCount2Increase: 0,
      clueCount3Increase: 1,
      creditsIncrease: 20,
      GRID_DATA: [
        ["E", "N", "C", "H", "A", "N", "T"],
        ["W", "I", "L", "D", "L", "I", "F", "E"],
        ["S", "E", "R", "E", "N", "I", "T", "Y"],
        ["M", "O", "U", "N", "T", "A", "I", "N"],
        ["R", "U", "S", "S", "O"],
      ],

      ROW_CLUES: [
        "1. To delight or captivate with magic or charm.",
        "2. Animals living in their natural habitats.",
        "3. State of calm and peacefulness.",
        "4. Large landform with steep slopes and a peak.",
        "5. Brothers. Best known for directing Marvel movies.",
      ],
    },
    {
      levelName: "M2",
      color: MediumLevelsColorBackground,
      levelPoints: 16,
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 10,
      GRID_DATA: [
        ["L", "A", "V", "E", "N", "D", "E", "R"],
        ["P", "A", "R", "A", "D", "I", "S", "E"],
        ["M", "A", "J", "E", "S", "T", "I", "C"],
        ["T", "R", "A", "N", "S", "C", "R", "I", "P", "T"],
        ["P", "E", "R", "F", "U", "M", "E"],
        ["A", "L", "C", "O", "H", "O", "L"],
      ],

      ROW_CLUES: [
        "1. Fragrant purple flower used in aromatherapy.",
        "2. A place of perfect happiness and beauty.",
        "3. Grand and impressive in appearance.",
        "4. Written record of spoken words.",
        "5. Fragrant scented liquid.",
        "6. Common recreational beverage ingredient.",
      ],
    },
    {
      levelName: "M3",
      color: MediumLevelsColorBackground,
      levelPoints: 14,
      clueCount1Increase: 3,
      clueCount2Increase: 0,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["P", "A", "I", "N", "T", "I", "N", "G"],
        ["G", "L", "A", "S", "S", "E", "S"],
        ["N", "E", "C", "K", "L", "A", "C", "E"],
        ["T", "I", "S", "S", "U", "E", "S"],
        ["R", "A", "D", "I", "S", "H"],
        ["M", "A", "T", "C", "H", "E", "S"],
      ],

      ROW_CLUES: [
        "1. Artistic creation on canvas.",
        "2. Eyewear for vision correction.",
        "3. Jewelry worn around the neck.",
        "4. Disposable paper for nose blowing.",
        "5. A small, crisp, edible root vegetable.",
        "6. Fire-starting tools with a striking surface",
      ],
    },
    {
      levelName: "M4",
      color: MediumLevelsColorBackground,
      levelPoints: 18,
      clueCount1Increase: 2,
      clueCount2Increase: 0,
      clueCount3Increase: 2,
      creditsIncrease: 30,
      GRID_DATA: [
        ["C", "U", "T", "L", "E", "R", "Y"],
        ["G", "A", "R", "L", "I", "C"],
        ["F", "I", "R", "E", "P", "L", "A", "C", "E"],
        ["S", "E", "N", "S", "O", "R", "S"],
        ["C", "H", "O", "P", "S", "T", "I", "C", "K", "S"],
        ["S", "T", "E", "P", "H", "E", "N"],
      ],

      ROW_CLUES: [
        "1. Eating utensils like knives, forks, and spoons.",
        "2. Pungent and aromatic bulb used in cooking.",
        "3. Heating feature with a chimney for burning wood.",
        "4. Utensils used for eating in some Asian cuisines.",
        "5. A small, crisp, edible root vegetable.",
        "6. ... King. Famous author of horror novels.",
      ],
    },
    {
      levelName: "M5",
      color: MediumLevelsColorBackground,
      levelPoints: 20,
      clueCount1Increase: 2,
      clueCount2Increase: 2,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["B", "L", "I", "N", "D", "E", "R", "S"],
        ["C", "L", "O", "U", "D", "S"],
        ["A", "V", "O", "C", "A", "D", "O"],
        ["S", "P", "A", "G", "H", "E", "T", "T", "I"],
        ["N", "E", "S", "T", "L", "E"],
        ["S", "H", "E", "L", "L"],
        ["B", "I", "R", "C", "H"],
      ],

      ROW_CLUES: [
        "1. Peaky ... - British crime drama TV series, starring Cillian Murphy.",
        "2. Visible collections of water droplets or ice crystals in the sky.",
        "3. Buttery green fruit often used in salads and spreads.",
        "4. Long, thin pasta noodles often served with sauce.",
        "5. Swiss multinational food and beverage company.",
        "6. Hard outer covering of various objects or organisms.",
        "7. A type of deciduous tree with distinctive white bark.",
      ],
    },
    {
      levelName: "M6",
      color: MediumLevelsColorBackground,
      levelPoints: 20,
      clueCount1Increase: 2,
      clueCount2Increase: 2,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["S", "A", "M", "S", "U", "N", "G"],
        ["C", "A", "L", "E", "N", "D", "A", "R"],
        ["O", "U", "T", "L", "E", "T"],
        ["O", "R", "E", "N", "G", "A", "D", "E"],
        ["C", "O", "T", "T", "O", "N"],
        ["S", "N", "O", "O", "P"],
        ["C", "R", "E", "A", "T", "I", "N", "E"],
      ],

      ROW_CLUES: [
        "1. South Korean multinational electronics company. Popular for the Galaxy series.",
        "2. Tool for organizing dates and events.",
        "3. Electrical ... - Device for connecting electrical appliances to a power source.",
        "4. Refreshing citrus-flavored drink.",
        "5. Soft, fluffy fiber used in textiles.",
        "6. ... Dogg. American rapper and entertainer.",
        "7. Natural compound found in muscles and commonly used supplement.",
      ],
    },
    {
      levelName: "M7",
      color: MediumLevelsColorBackground,
      levelPoints: 18,
      clueCount1Increase: 2,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 25,
      GRID_DATA: [
        ["N", "A", "R", "C", "O", "T", "I", "C", "S"],
        ["L", "E", "A", "T", "H", "E", "R"],
        ["P", "I", "E", "R", "O", "G", "I"],
        ["B", "O", "U", "Q", "U", "E", "T"],
        ["E", "N", "G", "I", "N", "E"],
        ["T", "H", "R", "O", "N", "E", "S"],
        ["K", "E", "T", "T", "L", "E"],
      ],

      ROW_CLUES: [
        "1. Strong drugs used for pain relief or recreation.",
        "2. Tanned animal skin used for various products.",
        "3. Polish dumplings.",
        "4. A collection of fresh flowers, often arranged for gifting or decoration.",
        "5. Machine that converts energy into mechanical work, often used in vehicles and machinery.",
        "6. Game of ... - Popular fantasy TV series based on George R.R. Martin's novels.",
        "7. A vessel used for boiling water or other liquids.",
      ],
    },
    {
      levelName: "M8",
      color: MediumLevelsColorBackground,
      levelPoints: 21,
      clueCount1Increase: 0,
      clueCount2Increase: 1,
      clueCount3Increase: 3,
      creditsIncrease: 15,
      GRID_DATA: [
        ["P", "R", "O", "T", "E", "I", "N"],
        ["G", "E", "O", "G", "R", "A", "P", "H", "Y"],
        ["C", "O", "L", "U", "M", "B", "U", "S"],
        ["S", "O", "C", "R", "A", "T", "E", "S"],
        ["S", "Y", "N", "D", "I", "C", "A", "T", "E"],
        ["B", "A", "C", "K", "P", "A", "C", "K"],
      ],

      ROW_CLUES: [
        "1. Essential nutrient for building and repairing tissues in the body.",
        "2. The study of the Earth's physical features, climate, and human populations.",
        "3. Explorer who is credited with discovering the Americas in 1492.",
        "4. Ancient Greek philosopher known for his contributions to ethics",
        "5. Group of individuals or organizations that collaborate on a common goal or enterprise.",
        "6. A bag worn on the back for carrying belongings, often used by hikers or students.",
      ],
    },
    {
      levelName: "M9",
      color: MediumLevelsColorBackground,
      levelPoints: 19,
      clueCount1Increase: 1,
      clueCount2Increase: 1,
      clueCount3Increase: 1,
      creditsIncrease: 20,
      GRID_DATA: [
        ["C", "L", "I", "P", "P", "E", "R", "S"],
        ["W", "I", "T", "C", "H", "E", "R"],
        ["G", "R", "I", "Z", "L", "L", "Y"],
        ["S", "T", "O", "R", "K"],
        ["G", "L", "Y", "P", "H"],
        ["G", "O", "O", "S", "E", "B", "U", "M", "P"],
      ],

      ROW_CLUES: [
        "1. Handheld cutting tools, often used for trimming hair or nails.",
        "2. Fantasy book series by Andrzej Sapkowski, featuring the character Geralt of Rivia.",
        "3. A type of large brown bear found in North America.",
        "4. A long-legged bird known for its distinctive beak and large nesting sites.",
        "5. A symbolic representation or character often used in writing systems or ancient inscriptions.",
        "6. Small raised bumps on the skin, often caused by cold or an emotional response.",
      ],
    },
    {
      levelName: "M10",
      color: MediumLevelsColorBackground,
      levelPoints: 23,
      clueCount1Increase: 2,
      clueCount2Increase: 2,
      clueCount3Increase: 0,
      creditsIncrease: 20,
      GRID_DATA: [
        ["D", "R", "I", "Z", "Z", "L", "E"],
        ["R", "H", "Y", "T", "H", "M"],
        ["T", "O", "R", "Q", "U", "E"],
        ["C", "A", "C", "H", "E"],
        ["G", "O", "S", "L", "I", "N", "G"],
        ["J", "A", "C", "U", "Z", "Z", "I"],
        ["K", "R", "A", "K", "O", "W"],
      ],

      ROW_CLUES: [
        "1. Light rain characterized by fine, misty drops.",
        "2. A regular and repeated pattern of beats or movements in music or dance.",
        "3. A measure of rotational force or twisting power, often expressed in Newton-meters (Nm).",
        "4. A hidden or stored collection of items, often for later use or retrieval.",
        "5. Canadian actor known for his roles in films such as 'La La Land' and 'The Notebook'.",
        "6. A brand name often used to refer to a whirlpool bath or hot tub.",
        "7. A historic city in Poland known for its architectural and cultural significance.",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Medium Level" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          showsVerticalScrollIndicator={false} // Set this to false to hide vertical scrollbar
          showsHorizontalScrollIndicator={false}
          data={levels}
          renderItem={({ item }) => (
            <LevelScreen
              levelName={item.levelName}
              color={MediumLevelsColorBackground}
              completedColor={MediumLevelsColorBackgroundCompleted} // Use completed color
              outlineColor={MediumLevelsColorOutline} // Use outline color
              completedOutlineColor={MediumLevelsColorOutlineCompleted} // Use completed outline color
              completedLevels={completedLevels}
              GRID_DATA={item.GRID_DATA}
              ROW_CLUES={item.ROW_CLUES}
              levelPoints={item.levelPoints}
              clueCount1Increase={item.clueCount1Increase}
              clueCount2Increase={item.clueCount2Increase}
              clueCount3Increase={item.clueCount3Increase}
              creditsIncrease={item.creditsIncrease}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.levelName}
          numColumns={2}
          columnWrapperStyle={styles.column}
        />
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
    backgroundColor: "rgba(246, 197, 58, 0.45)",
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MediumLevelsScreen;
