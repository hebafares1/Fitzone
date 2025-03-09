import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../types/user-types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigationTypes";
import useWorkoutData from "../../../assets/data/useData";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// @ts-ignore
import ImageSlider from "react-native-image-slider";
import CustomModal from "../../components/custom-modale";

export function Home() {
  const { exercises } = useWorkoutData();
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    message: string;
  }>({
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("user");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkModalTimeout = async () => {
      try {
        const modalTimestamp = await AsyncStorage.getItem("modalTimestamp");
        const currentTime = Date.now();

        if (
          !modalTimestamp ||
          currentTime - parseInt(modalTimestamp) > 300000
        ) {
          setModalMessage({
            title: "Info",
            message: "For better user experience, turn on the do not disturb.",
          });
          setModalVisible(true);

          await AsyncStorage.setItem("modalTimestamp", currentTime.toString());
        }
      } catch (error) {
        console.error("Error checking modal timeout:", error);
      }
    };

    checkModalTimeout();
  }, []);

  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Workout"
  >;

  const navigation = useNavigation<NavigationProp>();

  const AddWorkoutButton = ({
    exerciseName,
    exerciseImage,
  }: {
    exerciseName: string;
    exerciseImage: string;
  }) => (
    <TouchableOpacity
      className="items-center bg-white gap-4 rounded-3xl  p-3"
      onPress={() => navigation.navigate("Workout", { exerciseName })}
    >
      <Image
        source={{ uri: `${exerciseImage}` }}
        className="w-32 h-32 rounded-3xl"
      />
      <Text className="font-bold">{exerciseName} Workouts</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView className="flex-1 pt-4 px-6  bg-gray-900 ">
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <View className="flex-row w-full justify-between items-center">
              <Text className="text-3xl font-extrabold text-gray-400">
                Welcome to FitZone! {user?.name}
              </Text>
            </View>
            <Text className="text-gray-400 py-4">
              Get ready to crush your workout goals
            </Text>
          </View>
          <View className="h-40  rounded-xl overflow-hidden">
            <ImageSlider
              loopBothSides
              autoPlayWithInterval={10000}
              images={[
                "https://www.shutterstock.com/image-vector/people-exercising-fitness-gym-room-600nw-1933586630.jpg",
                "https://i.fbcd.co/products/resized/resized-750-500/1911-m30-i130-n011-s-c12-1262315857-exer-mainpreview-b5fcc022d42e6c19019914d709667c7682f72bdc0fafa12b31d9fed533a46e83.jpg",
                "https://img.freepik.com/premium-vector/people-exercising-gym-with-panoramic-window_179970-2061.jpg",
              ]}
              style={{ ResizeMode: "cover" }}
            />
          </View>
          <View className="pt-6 ">
            <View className="flex-row justify-between  bg-white p-4 py-6 rounded-3xl">
              <View className="w-[60%]">
                <Text className="font-bold text-xl pb-6 ">
                  Boost your energy levels
                </Text>
                <TouchableOpacity
                  className="items-center w-[40%]  bg-gray-900 rounded-3xl  py-2 px-4"
                  onPress={() => navigation.navigate("Search")}
                >
                  <Text className="text-white">Start</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require("../../../assets/HomeImg.png")}
                className="w-32 h-32 rounded-3xl"
              />
            </View>
            <Text className="text-gray-400 py-8 font-bold">
              Explore workout routines
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {exercises.slice(0, 4).map((exercise) => (
                <View key={exercise.id} className="w-[47%]">
                  <AddWorkoutButton
                    exerciseName={exercise?.category}
                    exerciseImage={exercise?.background}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Navbar />
      <CustomModal
        visible={modalVisible}
        title={modalMessage.title}
        message={modalMessage.message}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
