import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "./CustomHeader";
import {
  checkUsernameInStorage,
  updateUsername, // Import the updateUsername function
} from "./UserNameManager";
import Icon from "react-native-vector-icons/FontAwesome5";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState(""); // State for the new username input

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await checkUsernameInStorage();
      setUsername(storedUsername);
    };

    fetchUsername();
  }, []);

  // Function to handle the new username input change
  const handleUsernameChange = (text) => {
    setNewUsername(text);
  };

  // Function to update the username
  const handleUpdateUsername = async () => {
    if (newUsername.trim() === "") {
      // Handle case where the input is empty or contains only whitespace
      alert("Username cannot be empty");
      return;
    }

    // Call the updateUsername function to update AsyncStorage
    await updateUsername(newUsername);

    // Update the displayed username
    setUsername(newUsername);

    // Clear the new username input field
    setNewUsername("");
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Your Profile" />

      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Your Username</Text>
        <View style={styles.usernameInput}>
          <TextInput
            style={styles.input}
            placeholder={username}
            onChangeText={handleUsernameChange}
            value={newUsername}
          />
          <TouchableOpacity
            onPress={handleUpdateUsername}
            style={styles.updateButton}
          >
            <Icon name="pen" style={[styles.buttonIcon]} solid />
          </TouchableOpacity>
        </View>
      </View>

      {/* Input field for the new username */}

      {/* Button to confirm the username change */}

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
    backgroundColor: "lightgreen",
  },
  userInfoText: {
    fontSize: 24,
  },
  usernameText: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    // height: 40,
    borderColor: "gray",
    borderWidth: 1,
    // marginTop: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  updateButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // borderRadius: 5,
    // marginTop: 10,
  },
  updateButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  backgroundChange: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightcoral",
  },
  backgroundChangeText: {
    fontSize: 24,
  },
  usernameInput: {
    flexDirection: "row",
    width: "90%",
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfile;
