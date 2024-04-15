import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Links = () => {
  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-secondary-100"
      >
        Features
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 50,
          paddingTop: 20,
          
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => router.push("/pdf")}
            style={{ width: wp(44), height: wp(52) }}
            className="flex justify-end p-4 mb-4"
          >
            <Image
              source={require("../assets/images/pdf-audio.png")}
              resizeMode="cover"
              style={{ width: wp(44), height: wp(52) }}
              className="rounded-[15px] absolute"
            />
            {/* <Text
              style={{ fontSize: hp(2.3) }}
              className="font-semibold text-white text-center tracking-wide"
            >
              Listen
            </Text> */}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.push("/braille")}
            style={{ width: wp(44), height: wp(52) }}
            className="flex justify-end p-4 mb-4"
          >
            <Image
              source={require("../assets/images/braille-audio.png")}
              resizeMode="cover"
              style={{ width: wp(44), height: wp(52) }}
              className="rounded-[15px] absolute"
            />
            {/* <Text
              style={{ fontSize: hp(2.3) }}
              className="font-semibold text-white text-center tracking-wide"
            >
              Brille
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Links;
