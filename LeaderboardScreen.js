import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { FIREBASE_APP } from "./firebaseConfig";
import CustomHeader from "./CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUsernameInStorage } from "./UserNameManager";
const Leaderboard = () => {
  const db = getDatabase(FIREBASE_APP);
  const [usersData, setUsersData] = useState([]);
  const [checkUsername, setCheckUsername] = useState();
  // Make sure newly registered user is saved to the database

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await checkUsernameInStorage();
      setCheckUsername(storedUsername);
    };

    fetchUsername();
  }, []);

  const initializeUserData = async () => {
    try {
      const usernameInitial = await AsyncStorage.getItem("usernameInitial");
      const points = await AsyncStorage.getItem("points");

      if (usernameInitial && points) {
        // Data is already initialized or points are greater than 0
        return;
      }

      if (usernameInitial) {
        // Initialize data in Firebase
        await set(
          ref(db, `users/${usernameInitial}/username`),
          usernameInitial
        );
        await set(ref(db, `users/${usernameInitial}/points`), 0);
      }
    } catch (error) {
      console.error("Error initializing user data:", error);
    }
  };

  useEffect(() => {
    initializeUserData();
    // Set up a Firebase listener to fetch user data
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        // Convert the Firebase data to an array of user objects
        const data = snapshot.val();
        const userDataArray = Object.entries(data).map(
          ([userId, userData]) => ({
            userId,
            username: userData.username,
            points: userData.points,
          })
        );

        // Sort the data by points in descending order
        const sortedData = userDataArray.sort((a, b) => b.points - a.points);
        setUsersData(sortedData);
      } else {
        // Handle the case when there's no data
        setUsersData([]);
      }
    });
  }, [db]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Top Players" />
      {/* <View style={styles.playerBoxesContainer}> */}
      <FlatList
        data={usersData}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.leaderboardItem,
              item.username === checkUsername
                ? { backgroundColor: "green" }
                : index === 0
                ? { backgroundColor: "gold" } // Gold for the first item
                : index === 1
                ? { backgroundColor: "silver" } // Silver for the second item
                : index === 2
                ? { backgroundColor: "rgba(97,87,35,1)" } // Bronze for the third item
                : null,
            ]}
          >
            {index < 3 ? (
              // Conditionally load different images for the first three items
              <Image
                source={
                  index === 0
                    ? require("./assets/medal1.png")
                    : index === 1
                    ? require("./assets/medal2.png")
                    : index === 2
                    ? require("./assets/medal3.png")
                    : null // If index is greater than 2, no image
                }
                style={styles.imageMedal}
              />
            ) : null}
            <Text style={styles.rank}>
              {index < 3 // Conditionally change text for the first three items
                ? index === 0
                : // For indexes greater than 2, display the regular index
                  index + 1}
            </Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.points}>{item.points} points</Text>
          </View>
        )}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#f5e1ce",
  },
  playerBoxesContainer: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  leaderboardItem: {
    backgroundColor: "lightblue",
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginVertical: 5,
    // borderWidth: 6, // Set border width for all sides
    // borderColor: "rgba(0, 0, 0, 0.4)", // Set border color
    elevation: 5,
  },
  rank: {
    // flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    flex: 5,
    fontSize: 18,
  },
  points: {
    flex: 2,
    fontSize: 18,
  },
  imageMedal: {
    width: 30,
    height: 30,
    marginHorizontal: 4,
  },
});

export default Leaderboard;
