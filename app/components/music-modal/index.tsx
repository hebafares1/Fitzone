import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const sounds = [
  {
    id: 1,
    name: "Rain",
    description: "Relaxing rain sounds to keep you calm.",
    icon: (
      <MaterialCommunityIcons name="weather-rainy" size={32} color="#00ADEF" />
    ),
    file: require("../../../assets/sounds/rain-relax.mp3"),
  },
  {
    id: 2,
    name: "Birds",
    description: "Relaxing Birds sounds to keep you calm.",
    icon: <MaterialCommunityIcons name="bird" size={32} color="#00ADEF" />,
    file: require("../../../assets/sounds/birds-relax.mp3"),
  },
  {
    id: 3,
    name: "Ocean",
    description: "Relaxing Ocean sounds to keep you calm.",
    icon: <MaterialCommunityIcons name="waves" size={32} color="#00ADEF" />,
    file: require("../../../assets/sounds/ocean-relax.mp3"),
  },
];

export const MusicPlayer = ({
  isModalVisible,
  toggleModal,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedSound, setSelectedSound] = useState<number | null>(null);

  useEffect(() => {
    const preloadSounds = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(sounds[0].file);
        setSound(sound);
        await sound.setIsLoopingAsync(true);
      } catch (error) {
        console.error("Error preloading sound:", error);
      }
    };

    preloadSounds();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const toggleSound = async (soundFile: any, soundId: number) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setSelectedSound(null);
        if (selectedSound === soundId) return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);
      setSelectedSound(soundId);
      await newSound.setIsLoopingAsync(true);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync();
          sound.unloadAsync();
          setSound(null);
          setSelectedSound(null);
        }
      };
    }, [sound])
  );

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-11/12 bg-white rounded-lg p-6">
          <Text className="text-lg font-bold text-black mb-4">
            Select Background Sound
          </Text>
          <FlatList
            data={sounds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`flex-row items-center p-4 mb-3 rounded-lg ${
                  selectedSound === item.id ? "bg-green-200" : "bg-gray-200"
                }`}
                onPress={() => toggleSound(item.file, item.id)}
              >
                <View className="w-12 h-12 mr-4 items-center justify-center">
                  {item.icon}
                </View>
                <View>
                  <Text className="text-base font-semibold text-black">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            className="mt-4 p-3 bg-red-600 rounded-lg"
            onPress={toggleModal}
          >
            <Text className="text-white text-center font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
