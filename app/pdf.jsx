import * as DocumentPicker from "expo-document-picker";
import * as Speech from "expo-speech";
import { StatusBar } from "expo-status-bar";
import React, {
  useEffect,
  useState,
  memo,
  useMemo,
  useContext,
  useRef,
} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { icons, images } from "../constants";
import { TextRefContext } from "./TextRefProvider";
import RollingText from "react-native-rolling-text";

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
  const pause = useRef(false);
  const scrollRef = useRef(null);
  const WORDS = useRef([]);
  const LIMIT = 30;
  const [limit, setLimit] = useState(LIMIT);
  const textIndex = useRef(0);
  const textRefArray = useContext(TextRefContext);
  let isUp = false;

  const index = useRef(0);

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

  async function extractText(pdf) {
    Speech.speak("Getting Audio", { language: "hi" });
    setTextWords([
      "The",
      "quick",
      "brown",
      "fox",
      "jumps",
      "over",
      "the",
      "lazy",
      "dog",
    ]);
    Speech.speak("Audio Extracted", { language: "hi" });
  }
  const Cancel = () => {
    Speech.stop();
    setPlaying(false);
    setPdf(undefined);
    setTextWords([]);
  };

  const onPlayandPause = () => {
    if (playing) {
      pause.current = true;
      setPlaying(false);
    } else setPlaying(true);
  };

  const handleScroll = () => {
    isUp = !isUp;
    if (isUp) scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    else scrollRef.current?.scrollToEnd();
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    if (WORDS.current[index.current] === undefined) return;

    if (!playing) {
      Speech.stop();
      textIndex.current = Math.max(textIndex.current - 2, 0);
    }

    if (playing) {
      const text = pause.current
        ? textWords.slice(textIndex.current, limit).join(" ")
        : WORDS.current[index.current];
      Speech.speak(text, {
        onStart: () => {
          pause.current = false;
          if (!isUp) scrollRef.current?.({ animated: true });
        },

        onDone: () => {
          index.current++;

          if (index.current >= WORDS.current.length) {
            index.current = 0;
            textIndex.current = 0;
            setPlaying(false);
            return Alert.alert("Congrats you completed this PDF", undefined, [
              { text: "Great Thanks :)" },
            ]);
          } else setLimit((p) => p + LIMIT);
        },
        onBoundary: () => {
          if (textIndex.current < textRefArray.length) {
            textRefArray[textIndex.current++].current?.setNativeProps({
              style: { opacity: 1 },
            });
          }
        },
      });
    }
  }, [playing, limit]);

  useEffect(() => {
    if (textWords.length === 0) return;
    const N = textWords.length;
    for (let i = 0; i < N; i += 30)
      WORDS.current.push(textWords.slice(i, i + LIMIT).join(" "));

    WORDS.current = WORDS.current.filter((word) => word !== "");
  }, [textWords]);

  return (
    <SafeAreaView className="flex-1 bg-primary flex space-y-5" edges={["top"]}>
      <ScrollView>
        <View className="m-2">
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
                backgroundColor: "#161622",
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
          {textWords.length > 0 ? (
            <>
              <View className="flex-row mt-5 justify-center w-[100%]">
                <TouchableOpacity
                  className="mx-3 bg-black-100 flex justify-center items-center  rounded-[5px]"
                  onPress={Cancel}
                >
                  <Text className="text-secondary-100 text-[20px] font-bold px-5 py-2">
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
          {/* <View
            className={`flex-1 w-full flex-row flex-wrap justify-start bg-black-100 mt-2 ${
              textWords.length > 0 && "mb-20"
            }`}
          >
            {textWords.slice(0, 30).map((word, index) => {
              return <Words key={index} word={word} />;
            })}
          </View> */}
          {textWords.length > 0 && (
            <View className="z-0 mt-20 mx-auto w-11/12 h-12 flex flex-row items-center bg-secondary-100 rounded-lg shadow-xl border-2 border-purple-900 overflow-hidden">
              <TouchableOpacity
                className="flex justify-center items-center rounded-lg bg-black-100"
                onPress={onPlayandPause}
              >
                <Text className="text-white text-lg font-bold px-6 py-2">
                  {playing ? "Pause" : "Play"}
                </Text>
              </TouchableOpacity>
              <Pressable
                className="ml-5 overflow-hidden"
                onPress={handleScroll}
              >
                <RollingText
                  delay={400}
                  style={{
                    fontSize: 35,
                    color: "#BF40BF",
                    overflow: "hidden",
                  }}
                  durationMsPerWidth={20}
                  startDelay={200}
                >
                  {!pdf?.canceled ? pdf.assets[0].name : "No Name"}
                </RollingText>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
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

const Words = memo(({ word }) => {
  const ref = useRef(null);
  const textRefArray = useContext(TextRefContext);

  useEffect(() => {
    textRefArray.push(ref);
  }, []);

  return (
    <Text
      ref={ref}
      className="text-[40px] text-secondary-100 font-bold pl-2 text-left flex"
      style={{ opacity: 0.3 }}
    >
      {word}
    </Text>
  );
});
