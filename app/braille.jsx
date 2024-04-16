import { StatusBar } from "expo-status-bar";
import React, { useDebugValue, useEffect } from "react";
import { Image, Text, View, TextInput, ScrollView } from "react-native";
import CheckBox from "react-native-check-box";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import * as Speech from "expo-speech";
const Braille = () => {
  useEffect(() => {
    Speech.speak("Braille page ", { language: "hi" });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-primary flex space-y-5" edges={["top"]}>
      <StatusBar backgroundColor="#161622" style="light" />

      <View className="flex-row justify-between items-center mx-5">
        <View classNamespace-y-2>
          <Text className="text-4xl text-white">Braille To </Text>
          <Text className="text-secondary text-5xl font-bold mt-1">Dhvani</Text>
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
      <View
        style={{ flex: 1, alignContent: "center", marginTop: 2 }}
        className="mr-2 ml-2"
      >
        <ScrollView
          style={{
            width: "100%",
            maxHeight: 200,
            borderColor: "gray",
            borderRadius: 5,
            borderWidth: 1,
          }}
          showsHorizontalScrollIndicator={true}
          indicatorStyle="white"
        >
          <TextInput
            style={{ width: "100%", height: "100%" }}
            multiline={true}
            editable={false}
            value={
              "hehehehehehhfeheaflaehfaflhaefhlealflhealfeef efahl alhhlaef ajlhafehjl eaflhj hjlaf ljhfe ljhafeh afejlhlaf ljhafe jlhaeflhjafeljh  e ekfnla fenklnf nae nlrknlaer klnaknle aknankl nka nkrklna knlklnr ealnreln klrek lnaerlkn knlrae lnka"
            }
            className="text-white text-2xl "
          />
        </ScrollView>
      </View>
      <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }} className=" gap-10 p-10">
        <View style={{ flexDirection: "column" }}>
          <CheckBox style={{flex: 1, padding: 10}} />
          <CheckBox style={{flex: 1, padding: 10}} />
          <CheckBox style={{flex: 1, padding: 10}} />
        </View>
        <View style={{ flexDirection: "column" }}>

          <CheckBox style={{flex: 1, padding: 10}} className="rounded-lg" />
          <CheckBox style={{flex: 1, padding: 10}} className="rounded-lg" />
          <CheckBox style={{flex: 1, padding: 10}} className="rounded-lg" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Braille;
