import { useState, useEffect } from "react";
import { Audio } from "expo-av";

const soundFilePath = "./assets/sounds/buttonClick.mp3"; // Hardcoded path to sound file

export const useSound = () => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundObject, setSoundObject] = useState(null);

  const loadSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require(soundFilePath));
      setSoundObject(sound);
      setSoundLoaded(true);
    } catch (error) {
      console.error(`Error loading sound ${soundFilePath}:`, error);
      setSoundLoaded(false);
    }
  };

  const handleSoundPlayOnClick = async () => {
    if (!soundLoaded) {
      await loadSound(); // Load the sound if not already loaded
    }

    if (soundObject) {
      try {
        await soundObject.replayAsync();
      } catch (error) {
        console.error(`Error playing sound ${soundFilePath}:`, error);
      }
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  return { soundLoaded, handleSoundPlayOnClick };
};
