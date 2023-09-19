import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
// Firebase
import { getDatabase, ref, onValue, set } from "firebase/database";
import { FIREBASE_APP } from "../firebaseConfig";

import CustomHeader from "../CustomHeader";

const Leaderboard = () => {
  const db = getDatabase(FIREBASE_APP);
  const [usersData, setUsersData] = useState([]);
  // Check what is the inital username of this user
  const [checkUsernameInitial, setCheckUsernameInitial] = useState();

  // Fetch the usernameInitial from the AsyncStorage
  useEffect(() => {
    const fetchUsername = async () => {
      const usernameInitial = await AsyncStorage.getItem("usernameInitial");
      setCheckUsernameInitial(usernameInitial);
    };

    fetchUsername();
  }, []);

  // Make sure the data for the particular user is saved to the database,
  //  to be able to show it on the leaderboard
  const initializeUserData = async () => {
    try {
      const usernameInitial = await AsyncStorage.getItem("usernameInitial");
      const points = await AsyncStorage.getItem("points");

      if (usernameInitial && points) {
        // If the data is already initialized
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
    // Written with a help of ChatGPT
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
        // Handle the case when there is no data
        setUsersData([]);
      }
    });
  }, [db]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Top Players" />
      {/* Container with info */}
      <View style={styles.infoBox}>
        <Text style={styles.rankBox}>No.</Text>
        <Text style={styles.usernameBox}>Username</Text>
        <Text style={styles.pointsBox}>Points</Text>
      </View>
      {/* Written with a help of ChatGPT */}
      <FlatList
        // Hide the scrollbars
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // Display only first 10 records
        data={usersData.slice(0, 10)}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <LinearGradient
            // Change the colour depending on whether the user is on the leaderboard,
            // And the first 3 places
            colors={
              // Check if any of the userIDs inside the leaderboard are the same as user's
              item.userId === checkUsernameInitial
                ? ["rgba(26,149,36,1)", "rgba(19,123,27,1)"]
                : index === 0
                ? ["gold", "rgba(224,190,11,1)"] // Gold gradient
                : index === 1
                ? ["silver", "rgba(154,154,150,1)"] // Silver gradient
                : index === 2
                ? ["rgba(123,65,19,1)", "rgba(91,48,13,1)"] // Bronze gradient
                : ["transparent", "transparent"] // Otherwise make it transparent
            }
            style={[
              styles.leaderboardItem,
              // Add a border for the box if the user is on the leaderboard
              item.userId === checkUsernameInitial && {
                borderWidth: 3,
                borderColor: "rgb(204, 0, 0)",
              },
            ]}
          >
            {index < 3 ? (
              // Conditionally load different images for the first three items
              <Image
                source={
                  index === 0
                    ? require("../assets/medal1.png")
                    : index === 1
                    ? require("../assets/medal2.png")
                    : index === 2
                    ? require("../assets/medal3.png")
                    : null // If index is greater than 2, no image
                }
                style={styles.imageMedal}
              />
            ) : null}
            <Text
              style={[
                styles.rank,
                index > 2 ? styles.customStyleForIndexesGreaterThanTwo : null,
              ]}
            >
              {index < 3 // Conditionally change text for the first three items
                ? index === 0
                : // For indexes greater than 2, display the regular index
                  index + 1}
            </Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.points}>{item.points}</Text>
          </LinearGradient>
        )}
      />
      {/* Make spacing at the bottom of the screen */}
      <View style={{ marginBottom: 30 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5e1ce",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  leaderboardItem: {
    backgroundColor: "rgb(231, 201, 174)",
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: 70,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 5,
  },
  infoBox: {
    backgroundColor: "rgb(192, 147, 106)",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 5,
  },
  customStyleForIndexesGreaterThanTwo: {
    marginHorizontal: 15,
  },
  rank: {
    fontSize: 22,
    fontFamily: "AppFontBold",
  },
  rankBox: {
    fontSize: 18,
    marginHorizontal: 8,
    fontFamily: "AppFontBold",
  },
  username: {
    flex: 5,
    fontSize: 18,
    marginLeft: 4,
    fontFamily: "AppFont",
  },
  usernameBox: {
    flex: 5,
    fontSize: 18,
    fontFamily: "AppFontBold",
  },
  pointsBox: {
    fontSize: 18,
    fontFamily: "AppFontBold",
    marginRight: 5,
  },
  points: {
    fontSize: 20,
    fontFamily: "AppFontBold",
    marginRight: 20,
  },
  imageMedal: {
    width: 35,
    height: 35,
    marginHorizontal: 4,
  },
});

export default Leaderboard;
