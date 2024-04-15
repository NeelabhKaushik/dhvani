import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageSlider from "../components/ImageSlider";
import Links from "../components/Links";
import { images } from "../constants";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary flex space-y-5" edges={["top"]}>
      <StatusBar backgroundColor="#161622" style="light" />

      <View className="flex-row justify-between items-center mx-5">
        <View classNamespace-y-2>
          <Text className="text-4xl text-white">Welcome to </Text>
          <Text className="text-secondary text-5xl font-bold ">Dhvani</Text>
          <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode="contain"
          />
        </View>
        <View className="flex justify-cetner items-center space-y-2">
          <Image
            source={images.logoSmall}
            className=" rounded-full w-20 h-20"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Image slider */}
      <View className="mt-5">
        <ImageSlider />
      </View>

      {/* links */}
      <View className="flex-1">
        <Links />
      </View>

      {/* Footer */}
      <View className="mb-4">
        <Text className="text-center text-secondary-100 text-sm">
          © 2024 Dhvani. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
