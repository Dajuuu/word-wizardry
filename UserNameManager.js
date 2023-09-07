import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_APP } from "./firebaseConfig";

export const generateRandomUsername = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `User_${result}`;
};

export const checkUsernameInStorage = async () => {
  try {
    const storedUsername = await AsyncStorage.getItem("username");
    return storedUsername;
  } catch (error) {
    console.error("Error reading username from AsyncStorage: ", error);
    return null;
  }
};

export const initializeUsername = async () => {
  const storedUsername = await checkUsernameInStorage();

  if (!storedUsername) {
    const randomUsername = generateRandomUsername(8); // Adjust the length as needed
    await AsyncStorage.setItem("username", randomUsername);
    await AsyncStorage.setItem("usernameInitial", randomUsername);
    return randomUsername;
  } else {
    return storedUsername;
  }
  // Function to update the username in AsyncStorage
};
export const updateUsername = async (newUsername) => {
  try {
    const db = getDatabase(FIREBASE_APP);
    const usernameInitial = await AsyncStorage.getItem("usernameInitial");

    // Update the current username in AsyncStorage
    await AsyncStorage.setItem("username", newUsername);

    // Update the username in the Firebase Realtime Database
    if (usernameInitial) {
      await set(ref(db, `users/${usernameInitial}/username`), newUsername);
    }
  } catch (error) {
    console.error("Error updating username:", error);
  }
};
