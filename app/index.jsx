import React from "react";
import { Image, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";

const RootLayout = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[180px] h-[100px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Empowering the visually impaired with{" "}
              <Text className="text-secondary">Dhvani</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <CustomButton
            title="Enter"
            handlePress={() => router.push("/home")}
            containerStyles={"w-full mt-7"}
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Unleashing the power of Braille education and text-to-speech
            technology to enhance accessibility and learning for all.
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default RootLayout;
