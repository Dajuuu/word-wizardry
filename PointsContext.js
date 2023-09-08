import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_APP } from "./firebaseConfig";

const PointsContext = createContext();

const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const db = getDatabase(FIREBASE_APP);

  // Load points from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadPoints() {
      try {
        const storedPoints = await AsyncStorage.getItem("points");
        // Use the username as the initial unique identifier
        const usernameInitial = await AsyncStorage.getItem("usernameInitial");
        if (storedPoints !== null) {
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
          await set(ref(db, `users/${usernameInitial}/points`), 0);
        }
      } catch (error) {
        console.error("Error loading points:", error);
      }
    }
    loadPoints();
  }, [db]);

  // Save points to AsyncStorage whenever it changes
  useEffect(() => {
    async function savePoints() {
      try {
        await AsyncStorage.setItem("points", points.toString());
        // Use the username as a unique identifier in the database
        const usernameInitial = await AsyncStorage.getItem("usernameInitial");

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
