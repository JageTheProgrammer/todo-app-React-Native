import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../ThemeContext";

const colors = [
  "#095995",
  "#e63946",
  "#ffb703",
  "#06d6a0",
  "#8338ec",
  "#3a86ff",
  "#ff006e",
  "#2ec4b6",
  "#ff9f1c",
  "#1d3557",
];

export default function Settings({ navigation }: any) {
  const { setColor, color } = useContext(ThemeContext);

  const selectColor = (c: string) => {
    setColor(c);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <Text style={[styles.header, { color }]}>Choose a Theme</Text>
      <View style={styles.grid}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorCircle,
              { backgroundColor: c, borderWidth: c === color ? 4 : 2 },
            ]}
            onPress={() => selectColor(c)}
            activeOpacity={0.7}
          />
        ))}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0c0b18",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  colorCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
    borderColor: "#fff",
  },
});
