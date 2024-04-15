import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Pdf = () => {
  return (
    <View style={styles.container}>
      <Text>Pdf</Text>
    </View>
  );
};

export default Pdf;


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

