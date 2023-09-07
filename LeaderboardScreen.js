import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { FIREBASE_APP } from "./firebaseConfig";
import CustomHeader from "./CustomHeader";

const Leaderboard = () => {
  const db = getDatabase(FIREBASE_APP);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    // Set up a Firebase listener to fetch usernames
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        // Convert the Firebase data to an array of usernames
        const data = snapshot.val();
        const usernameArray = Object.keys(data);
        setUsernames(usernameArray);
      } else {
        // Handle the case when there's no data
        setUsernames([]);
      }
    });
  }, [db]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Top Players" />

      <FlatList
        data={usernames}
        keyExtractor={(username, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.username}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f5e1ce",
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
    width: "90%",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginVertical: 5,
    // borderWidth: 6, // Set border width for all sides
    // borderColor: "rgba(0, 0, 0, 0.4)", // Set border color
    overflow: "hidden", // Clip child content within the border
    // elevation: 8,
  },
  rank: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    flex: 3,
    fontSize: 18,
  },
});

export default Leaderboard;
