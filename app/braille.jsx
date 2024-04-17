import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, ScrollView } from "react-native";
import CheckBox from "react-native-check-box";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import * as Speech from "expo-speech";

const Braille = () => {
  useEffect(() => {
    Speech.speak("Braille page ", { language: "hi" });
  }, []);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary flex space-y-5" edges={["top"]}>
      <StatusBar backgroundColor="#161622" style="light" />

      <View className="flex-row justify-between items-center mx-5">
        <View classNamespace="y-2">
          <Text className="text-4xl text-white">Braille To</Text>
          <Text className="text-secondary text-5xl font-bold mt-1">Dhvani</Text>
          <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode="contain"
          />
        </View>
        <View className="flex justify-center items-center space-y-2">
          <Image
            source={images.logoSmall}
            className="rounded-full w-20 h-20"
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-semibold mx-5 text-white">
          Convert Any pdf to multiple languages
        </Text>
      </View>

      <View className="mr-2 ml-2">
        <ScrollView
          className="w-full h-[200px] border-gray-500 border-2 rounded"
          showsHorizontalScrollIndicator={true}
          indicatorStyle="white"
        >
          <TextInput
            style={{ color: "white", backgroundColor: "#161622", fontSize: 20 }}
            multiline={true}
            editable={false}
            value={"Text comes here"}
            className="text-white text-2xl w-full h-full "
          />
        </ScrollView>
      </View>

      <View className="flex-row justify-center items-center space-x-10 p-5">
        <View className="flex-col">
          {[...Array(3)].map((_, index) => (
            <CheckBox
              key={index}
              className="p-10"
              checkBoxColor="#BF40BF"
              boxType='circle'
              onCheckColor="white"
              hideBox={true}
              lineWidth={0}
              onClick={() => setToggleCheckBox(!toggleCheckBox)}
              isChecked={toggleCheckBox}
              onAnimationType = "bounce"
              onFillColor = "white"
              disabled = {true}
            />
          ))}
        </View>
        <View className="flex-col">
          {[...Array(3)].map((_, index) => (
            <CheckBox
              key={index}
              className="p-10"
              checkBoxColor="#BF40BF"
              boxType="circle"
              onCheckColor="#1E1E2D"
              hideBox="true"
              onClick={() => setToggleCheckBox(!toggleCheckBox)}
              isChecked={toggleCheckBox}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Braille;
