import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_APP } from "./firebaseConfig";

// https://react.dev/reference/react/createContext
const PointsContext = createContext();

const PointsProvider = ({ children }) => {
  // Initalise the number of points
  const [points, setPoints] = useState(0);
  // Import the Firebase database
  const db = getDatabase(FIREBASE_APP);

  // Load points from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadPoints() {
      try {
        // Check for the points inside the AsyncStorage
        const storedPoints = await AsyncStorage.getItem("points");
        // Use the inital username as the unique identifier
        const usernameInitial = await AsyncStorage.getItem("usernameInitial");
        // Written with a help of ChatGPT - start
        if (storedPoints !== null) {
          // Set the points to the number stored inside the AsyncStorage
          setPoints(parseInt(storedPoints));
          if (usernameInitial) {
            // Update points when app loads, to make sure the database is updated if something wrong happens
            // Update points under the initial username
            await set(
              ref(db, `users/${usernameInitial}/points`),
              parseInt(storedPoints)
            );
          }
        } else {
          // If the points were not saved for the AsyncStorage then assign 0 to the database entry
          await set(ref(db, `users/${usernameInitial}/points`), 0);
        }
        // Written with a help of ChatGPT - end
      } catch (error) {
        console.error("Error loading points:", error);
      }
    }
    loadPoints();
  }, [db]);

  // Save points to the AsyncStorage and to the Firebase whenever it changes
  useEffect(() => {
    async function savePoints() {
      try {
        // Update the points counter
        await AsyncStorage.setItem("points", points.toString());
        // Use the inital username as the unique identifier
        const usernameInitial = await AsyncStorage.getItem("usernameInitial");

        // If the usernameInitial is found, update the points inside the Firebase
        if (usernameInitial) {
          await set(ref(db, `users/${usernameInitial}/points`), points);
        }
      } catch (error) {
        console.error("Error saving points:", error);
      }
    }
    savePoints();
  }, [points, db]);

  const addPoints = (amount) => {
    setPoints((prevPoints) => prevPoints + amount);
  };

  const resetPoints = () => {
    setPoints(0);
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, resetPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export { PointsContext, PointsProvider };
