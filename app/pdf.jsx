import * as DocumentPicker from "expo-document-picker";
import * as Speech from "expo-speech";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { icons, images } from "../constants";

const Pdf = () => {
  useEffect(() => {
    Speech.speak("Pdf page ", { language: "hi" });
  }, []);
  const [value, setValue] = useState("en");
  const [pdf, setPdf] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [audioButtonContent, setAudioButtonContent] = useState("Geting Audio");
  const [playing, setPlaying] = useState(false);
  const [textWords, setTextWords] = useState([]);

  const openPicker = async () => {
    try {
      Speech.speak("Selecting Pdf ", { language: "hi" });
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false, // Disable multi-select
      });

      if (file.canceled) {
        setPdf(null);
        Speech.speak("Selection Cancelled ", { language: "hi" });
      }
      if (!file.canceled) {
        console.log("File picked:", file);
        Speech.speak("Pdf Selected ", { language: "hi" });
        setPdf(file);
        // Do something with the file
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const speakLanguage = (lang) => {
    Speech.speak(`${lang} selected`, { language: "hi" });
  };

  const getAudio = () => {
    Speech.speak("Getting Audio", { language: "hi" });
    pdfUtil.pdfToText(pdf.uri, function (err, data) {
      if (err) throw err;
      console.log(data); //print text
    });
    console.log("Pdf:", pdf);
    console.log("Language:", value);
  };

  // async function extractText(pdf) {
  //   const uri = pdf.assets[0].uri;
  //   var RNFS = require("react-native-fs");
  //   const pdfs = require("pdf-parse");

  //   let dataBuffer = RNFS.readFileSync(uri);

  //   pdfs(dataBuffer).then(function (data) {
  //     // number of pages
  //     console.log(data.numpages);
  //     // number of rendered pages
  //     console.log(data.numrender);
  //     // PDF info
  //     console.log(data.info);
  //     // PDF metadata
  //     console.log(data.metadata);
  //     // PDF.js version
  //     // check https://mozilla.github.io/pdf.js/getting_started/
  //     console.log(data.version);
  //     // PDF text
  //     console.log(data.text);
  //   });
  // }

  return (
    <SafeAreaView className="flex-1 bg-primary flex space-y-5" edges={["top"]}>
      <View className="m-2">
        <ScrollView>
          <StatusBar backgroundColor="#161622" style="light" />

          <View className="flex-row justify-between items-center mx-5">
            <View classNamespace-y-2>
              <Text className="text-4xl text-white">Pdf's to </Text>
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
          <View className="mt-4">
            <Text className="text-semibold mx-5 text-white">
              Convert Any pdf to multiple languages
            </Text>
          </View>
          <View className=" mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Pdf
            </Text>
            <TouchableOpacity onPress={() => openPicker()}>
              {pdf ? (
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <Text className="text-semibold mx-5 text-white">
                    {pdf.assets[0].name}
                  </Text>
                  <View className="w-70 h-10 border border-dashed border-secondary-100 justify-center items-center mt-2">
                    <Text className="text-semibold mx-5 text-fuchsia-100">
                      Click again to select diffrent file
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center ">
                    <Image source={icons.upload} className="w-1/2 h-1/2" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className=" mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Select Language
            </Text>
            <Dropdown
              className="w-full h-14 px-4 bg-black-100 rounded-2xl justify-center items-center relative"
              selectedTextStyle={{ color: "white" }}
              itemTextStyle={{ color: "white" }}
              activeColor={{ backgroundColor: "bg-black", color: "white" }}
              containerStyle={{
                backgroundColor: "bg-black-100",
                borderRadius: 10,
                borderColor: "gray",
                borderWidth: 0.5,
              }}
              iconStyle={{ height: 10, width: 10, tintColor: "white" }}
              itemContainerStyle={{
                backgroundColor: "bg-black-100",
                borderRadius: 5,
              }}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={
                !isFocus ? "Select language (Default: English)" : "..."
              }
              placeholderStyle={{ color: "white" }}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                speakLanguage(item.label);
                setIsFocus(false);
              }}
              renderRightIcon={() => (
                <Image source={icons.search} className="h-[30px] w-[30px]" /> // You may need to adjust the size of the search icon
              )}
            />
          </View>
          <CustomButton
            title="Get Audio"
            handlePress={() => extractText(pdf)}
            containerStyles={"w-full mt-7"}
            isLoading={pdf ? false : audioButtonContent === "Fetching..."}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Pdf;

const data = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Gujarati", value: "gu" },
  { label: "Marathi", value: "mr" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "tl" },
  { label: "Punjabi", value: "pa" },
  { label: "Bengali", value: "bn" },
  { label: "Urdu", value: "ur" },
  { label: "Kannada", value: "kn" },
  { label: "Odia", value: "or" },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black-100",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
