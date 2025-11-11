// ThemeContext.tsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
  color: "#000000ff",
  setColor: (color: string) => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [color, setColor] = useState("#000000ff");

  useEffect(() => {
    const loadColor = async () => {
      const saved = await AsyncStorage.getItem("themeColor");
      if (saved) setColor(saved);
    };
    loadColor();
  }, []);

  const changeColor = async (newColor: string) => {
    setColor(newColor);
    await AsyncStorage.setItem("themeColor", newColor);
  };

  return (
    <ThemeContext.Provider value={{ color, setColor: changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
