import { FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseDetails from "../../components/exercise_Details";
import Navbar from "../../components/navbar";
import useWorkoutData from "../../../assets/data/useData";
import { RootStackParamList } from "../../../types/navigationTypes";

type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  description: string;
  img: string;
  category: string;
  gif_url: string;
  equipment_needed: string;
};

type ExerciseStepsRouteProp = RouteProp<RootStackParamList, "Workout">;

export function WorkoutDetails() {
  const navigation = useNavigation();
  const [workout, setWorkout] = useState<boolean>();
  const route = useRoute<ExerciseStepsRouteProp>();
  const {
    exerciseName,
    selectedDifficulty,
    selectedWorkout,
    duration,
  } = route.params;
  const { exercises } = useWorkoutData();
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    let filtered = exercises.filter(
      (exercise) => exercise.category === exerciseName
    );

    if (filtered.length === 0 && selectedWorkout) {
      filtered = exercises.filter(
        (exercise) => exercise.category === selectedWorkout
      );
    }

    //@ts-ignore
    setFilteredExercises(filtered);
  }, [exerciseName, selectedWorkout, exercises]);

  const adjustSetsAndReps = (sets: number, reps: number) => {
    let adjustedSets = sets;
    let adjustedReps = reps;

    if (selectedDifficulty === "Intermediate") {
      adjustedSets = Math.round(sets * 1.5);
      adjustedReps = Math.round(reps * 1.5);
    } else if (selectedDifficulty === "Advanced") {
      adjustedSets = sets * 2;
      adjustedReps = reps * 2;
    }

    return { adjustedSets, adjustedReps };
  };
  const { adjustedSets, adjustedReps } = adjustSetsAndReps(10, 2);
  return (
    <>
      <SafeAreaView className="flex-1 gap-4 w-screen bg-gray-900 ">
        <ImageBackground
          source={require("../../../assets/workout.png")}
          className="object-fill flex-col justify-between h-[40%] w-screen px-4 py-6"
        >
          <View className="flex-row justify-between">
            <TouchableOpacity onPress={navigation.goBack}>
              <FontAwesome color={"white"} name="arrow-left" size={20} />
            </TouchableOpacity>
          </View>
          <View className="flex-col gap-1 pb-6">
            <Text className="text-3xl text-gray-200  ">
              {exerciseName || selectedWorkout} Workouts
            </Text>
            <Text className="text-xl text-white ">Fitness journey</Text>
          </View>
        </ImageBackground>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View className="flex-row justify-evenly">
            <View className="items-center">
              <Text className="text-gray-400 text-2xl font-bold">
                {duration || 30}
              </Text>
              <Text className=" text-gray-400">Duration</Text>
            </View>

            <View className="border-l-2 border-r-2 px-6 items-center">
              <Text className="text-gray-400 text-2xl font-bold">
                {adjustedSets}
              </Text>
              <Text className=" text-gray-400">Sets</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-400 text-2xl font-bold">
                {adjustedReps}
              </Text>
              <Text className=" text-gray-400">Reps</Text>
            </View>
          </View>
          <View className="px-6 w-full">
            <View className="py-4">
              <Text className="text-gray-400 text-xl ">Exercise</Text>
            </View>
            {filteredExercises.map((exercise) => (
              <ExerciseDetails
                key={exercise?.id}
                title={exercise?.name}
                //@ts-ignore
                duration={duration}
                repNumber={adjustedReps}
                setsNumber={adjustedSets}
                img={exercise?.img}
                exerciseDes={exercise?.description}
                gif_url={exercise?.gif_url}
                equipment={exercise?.equipment_needed}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Navbar />
    </>
  );
}
