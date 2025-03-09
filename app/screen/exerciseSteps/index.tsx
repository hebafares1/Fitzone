import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/button";
import Navbar from "../../components/navbar";
import { MusicPlayer } from "../../components/music-modal";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigationTypes";
import WebView from "react-native-webview";

type ExerciseStepsRouteProp = RouteProp<RootStackParamList, "ExerciseSteps">;

export function ExerciseSteps() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const route = useRoute<ExerciseStepsRouteProp>();
  const {
    exerciseDes,
    gif_url,
    title,
    img,
    duration,
    setsNumber,
    repNumber,
  } = route.params;

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView className="flex-1 justify-between gap-4 w-screen p-4 bg-gray-900">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-20 left-8 z-20"
        >
          <FontAwesome color={"black"} name="arrow-left" size={20} />
        </TouchableOpacity>
        <View className="h-[45%] w-full bg-transparent">
          <WebView
            source={{ uri: gif_url }}
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 80, gap: 4 }}>
          <Text className="text-gray-400 text-center text-lg font-bold">
            {title}
          </Text>
          <View className="flex-row justify-evenly border-2 p-2 border-gray-400 w-full gap-4">
            <Text className="text-gray-400 text-lg">Rep: {repNumber}</Text>
            <Text className="text-gray-400 text-lg">|</Text>
            <Text className="text-gray-400 text-lg">Sets: {setsNumber}</Text>
          </View>

          <View className="flex-col h-fit gap-6 bg-white rounded-md p-4 my-2">
            <Text>{exerciseDes}</Text>
            <View className="flex-row w-full justify-evenly">
              <Text className="text-gray-700 text-lg font-bold">
                Target: {Math.floor((duration || 30) / 60)}:
                {((duration || 30) % 60).toString().padStart(2, "0")}
              </Text>
            </View>
          </View>
          <View className="flex-row pb-20 items-center justify-end">
            <TouchableOpacity onPress={toggleModal}>
              <MaterialCommunityIcons name="music" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Navbar />
      <MusicPlayer isModalVisible={isModalVisible} toggleModal={toggleModal} />
    </>
  );
}
