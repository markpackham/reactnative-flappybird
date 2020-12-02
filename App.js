// code learned from https://www.youtube.com/watch?v=dhpjjAxKbHE
// the bird jumps with a left mouse click
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  // the bottom left of our bird
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  // score increases by 1 for every obstacle that passes by the screen
  const [score, setScore] = useState(0);
  // starts at 0 then becomes random
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const gravity = 3;
  let gap = 200;
  let obstacleWidth = 60;
  let obstacleHeight = 300;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

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

  // make bird jump
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      console.log("jumped");
    }
  };

  // start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      // set back to where started
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeft]);

  // start second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      // set back to where started
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeftTwo]);

  // check for collisions with obstacles
  useEffect(() => {
    if (
      ((birdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      // you only lose if you hit an obstacle not if you hit the bottom of the screen
      gameOver();
    }
  });

  // stop everything on game over
  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>Score: {score}</Text>}
        <StatusBar style="auto" />
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacles
          color={"yellow"}
          obstaclesLeft={obstaclesLeft}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
        />
        <Obstacles
          color={"green"}
          obstaclesLeft={obstaclesLeftTwo}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
        />
      </View>
    </TouchableWithoutFeedback>
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
