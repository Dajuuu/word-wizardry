import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "./CustomHeader";

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Your Profile" />

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>User Info Section</Text>
      </View>

      {/* Background Change Section */}
      <View style={styles.backgroundChange}>
        <Text style={styles.backgroundChangeText}>
          Background Change Section
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5e1ce",
  },
  userInfo: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen", // Change to your desired color
  },
  userInfoText: {
    fontSize: 24,
  },
  backgroundChange: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightcoral", // Change to your desired color
  },
  backgroundChangeText: {
    fontSize: 24,
  },
});

export default UserProfile;
