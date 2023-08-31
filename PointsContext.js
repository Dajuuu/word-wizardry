import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PointsContext = createContext();

const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  // Load points from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadPoints() {
      try {
        const storedPoints = await AsyncStorage.getItem("points");
        if (storedPoints !== null) {
          setPoints(parseInt(storedPoints));
        }
      } catch (error) {
        console.error("Error loading points:", error);
      }
    }
    loadPoints();
  }, []);

  // Save points to AsyncStorage whenever it changes
  useEffect(() => {
    async function savePoints() {
      try {
        await AsyncStorage.setItem("points", points.toString());
      } catch (error) {
        console.error("Error saving points:", error);
      }
    }
    savePoints();
  }, [points]);

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
