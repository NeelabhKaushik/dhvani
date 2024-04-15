import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className ="text-3xl">RootLayout</Text>
      <StatusBar style="auto" />
      <Link href="/pdf" style={{ color: "blue" }}>
        Go to pdf
      </Link>
    </View>
  );
};

export default RootLayout;
