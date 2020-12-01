import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Bird from "./components/Bird";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeigh = Dimensions.get("screen").height;
  // the bottom left of our bird
  const birdLeft = screenWidth / 2;
  const [BirdBottom, setBirdBottom] = useState(screenHeigh / 2);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Bird />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
