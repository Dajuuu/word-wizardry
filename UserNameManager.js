import AsyncStorage from "@react-native-async-storage/async-storage";

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
    return randomUsername;
  } else {
    return storedUsername;
  }
};
