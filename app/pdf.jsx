import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import DocumentPicker from "react-native-document-picker";

const Pdf = async () => {
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick();
      console.log(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        throw err;
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary flex space-y-5" edges={["top"]}>
      <StatusBar backgroundColor="#161622" style="light" />

      <View className="flex-row justify-between items-center mx-5">
        <View classNamespace-y-2>
          <Text className="text-4xl text-white">Pdf's to </Text>
          <Text className="text-secondary text-5xl font-bold ">Audio</Text>
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
      <View className="mt-4">
        <Text className="text-semibold mx-5 text-white">
          Convert Any pdf to multiple languages
        </Text>
      </View>
      <View className="items-center">
        <CustomButton
          title="Select Pdf"
          handlePress={selectDoc}
          containerStyles={"w-[100px] h-[20px] mt-7"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pdf;
