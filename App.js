import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Bird from "./components/Bird";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeigh = Dimensions.get("screen").height;
  // the bottom left of our bird
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeigh / 2);
  const gravity = 3;
  let gameTimerId;

  // start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        // keep dropping birdBottom by 3 till it hits 0
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
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
