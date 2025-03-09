import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { RootStackParamList } from "../../../types/navigationTypes";

type Types = {
  title: string;
  repNumber: number;
  duration: number;
  img: string;
  exerciseDes: string;
  gif_url: string;
  equipment: string;
  setsNumber: number;
};
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ExerciseSteps"
>;

const ExerciseDetails: React.FC<Types> = ({
  title,
  repNumber,
  duration,
  img,
  exerciseDes,
  gif_url,
  equipment,
  setsNumber,
}) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ExerciseSteps", {
          title,
          exerciseDes,
          img,
          gif_url,
          duration,
          setsNumber,
          repNumber,
        })
      }
      className="flex-row pb-4 justify-between items-center"
    >
      <View className="flex-row gap-4">
        <Image
          source={{ uri: `${img}` }}
          className="w-20 object-contain h-14 rounded-3xl"
        />
        <View>
          <Text className="text-gray-400 text-lg">{title}</Text>
          <View className="flex-row gap-4">
            <Text className="text-gray-400 text-lg">
              Equipment: {equipment}
            </Text>
          </View>
        </View>
      </View>
      <AntDesign name="right" size={20} color={"white"} />
    </TouchableOpacity>
  );
};

export default ExerciseDetails;
