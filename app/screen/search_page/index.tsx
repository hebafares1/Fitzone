import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutTypes from "../../components/workoutTypes";
import { TextInput } from "react-native-gesture-handler";
import DifficultyTypes from "../../components/difficulty";
import CustomButton from "../../components/button";
import Navbar from "../../components/navbar";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigationTypes";
import useWorkoutData from "../../../assets/data/useData";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function Search() {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Workout"
  >;

  const navigation = useNavigation<NavigationProp>();
  const [duration, setDuration] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const handlePress = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleWorkoutSelect = (workout: string) => {
    setSelectedWorkout(workout);
  };

  const { categories } = useWorkoutData();

  return (
    <>
      <SafeAreaView className="flex-1 pt-4 px-6 gap-6 bg-gray-900">
        <Text className="text-2xl font-medium text-gray-400">
          Explore Workouts
        </Text>
        <Text className="font-medium text-gray-400">Choose workout type</Text>
        <View className="flex-wrap gap-2 flex-row">
          {categories.map((category, index) => (
            <WorkoutTypes
              key={index}
              text={category}
              isSelected={selectedWorkout === category}
              onPress={() => handleWorkoutSelect(category)}
            />
          ))}
        </View>
        <View className="flex-row items-center py-4">
          <Text className="text-gray-400 flex-1 font-bold">Set duration:</Text>
          <TextInput
            className="bg-gray-600 flex-1 rounded-lg text-white"
            keyboardType="number-pad"
            value={duration}
            onChangeText={(e) => setDuration(e)}
            placeholder="in seconds:"
            placeholderTextColor={"gray"}
          />
        </View>
        <View className="flex-col gap-8">
          <Text className="text-gray-400 font-bold">Select difficulty</Text>
          <View className="flex-row justify-center gap-2">
            <DifficultyTypes
              text="Beginner"
              onPress={() => handlePress("Beginner")}
              isSelected={selectedDifficulty === "Beginner"}
            />
            <DifficultyTypes
              text="Intermediate"
              onPress={() => handlePress("Intermediate")}
              isSelected={selectedDifficulty === "Intermediate"}
            />
            <DifficultyTypes
              text="Advanced"
              onPress={() => handlePress("Advanced")}
              isSelected={selectedDifficulty === "Advanced"}
            />
          </View>
          <Text className="text-gray-400 text-xs text-center ">
            Sets and reps will be determined by {"\n"} the difficulty level.
          </Text>
        </View>
        <View className="flex-row pt-6">
          <CustomButton
            className="bg-blue-600"
            classNameText="text-white"
            text="Start Tracking"
            onPress={() =>
              //@ts-ignore
              navigation.navigate("Workout", {
                selectedDifficulty,
                selectedWorkout,
                duration,
              })
            }
            disabled={!selectedDifficulty || !selectedWorkout || !duration}
          />
        </View>
      </SafeAreaView>
      <Navbar />
    </>
  );
}
