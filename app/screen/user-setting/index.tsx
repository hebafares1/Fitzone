import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NotificationToggle } from "../../components/toggleButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import Navbar from "../../components/navbar";
import { User } from "../../../types/user-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";

type Settings = {
  handleLogout?: () => void;
};

export const SettingsScreen: React.FC<Settings> = ({ handleLogout }) => {
  const [stepGoal, setStepGoal] = useState("10000");
  const [workoutTarget, setWorkoutTarget] = useState("5");
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const [user, setUser] = useState<User | null>(null);

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

    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          text1: "Notification permissions are required to receive updates.",
          position: "top",
        });
      }
    };

    fetchUserData();
    requestNotificationPermission();
  }, []);

  const scheduleWorkoutReminder = async () => {
    if (workoutReminders) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Reminder",
          body: "Time for your workout! Stay fit.",
        },
        trigger: {
          hour: 18,
          minute: 0,
          repeats: true,
        },
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const scheduleWeeklyReport = async () => {
    if (weeklyReports) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Weekly Report",
          body: "Your weekly fitness report is ready! Check your progress.",
        },
        trigger: {
          day: 7,
          hour: 10,
          minute: 0,
          repeats: true,
        },
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  useEffect(() => {
    scheduleWorkoutReminder();
    scheduleWeeklyReport();
  }, [workoutReminders, weeklyReports]);

  return (
    <>
      <SafeAreaView className="flex-1 justify-between gap-4 w-screen  bg-black ">
        <View className="flex-row items-center bg-gray-400 p-6 justify-between ">
          <View className="flex-row items-center">
            <FontAwesome5 name="dumbbell" size={12} color="white" />
            <Text className="text-white text-xl font-bold ml-3">
              Hello {user?.name}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold">Settings</Text>
        </View>
        <View className="flex-1  gap-6 p-4">
          <View className="bg-gray-400 p-4 gap-4 rounded-3xl ">
            <Text className="text-white text-lg font-semibold ">
              Fitness Goals
            </Text>
            <View className="">
              <Text className="text-white">Daily Step Goal</Text>
              <TextInput
                className="bg-blue-600 text-white rounded-xl p-2 mt-1"
                keyboardType="numbers-and-punctuation"
                value={stepGoal}
                placeholder="Enter step goal"
                placeholderTextColor="#6b7280"
              />
            </View>
            <View>
              <Text className="text-white">Weekly Workout Target</Text>
              <TextInput
                className="bg-blue-600 text-white rounded-xl p-2 mt-1"
                keyboardType="numbers-and-punctuation"
                value={workoutTarget}
                onChangeText={(value) =>
                  setWorkoutTarget(value.replace(/[^0-9]/g, ""))
                }
                placeholder="Enter workout target"
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <View className="bg-gray-400 p-4 rounded-3xl">
            <Text className="text-white text-lg font-semibold mb-2">
              Notifications
            </Text>
            <NotificationToggle
              label="Workout Reminders"
              value={workoutReminders}
              onToggle={setWorkoutReminders}
            />
            <NotificationToggle
              label="Weekly Reports"
              value={weeklyReports}
              onToggle={setWeeklyReports}
            />
          </View>
          <TouchableOpacity
            className="flex-row items-center w-full justify-between bg-gray-400 p-4 rounded-3xl"
            onPress={handleLogout}
          >
            <Text className="text-white text-lg font-semibold ">Logout</Text>
            <AntDesign name="right" size={20} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Navbar />
    </>
  );
};
