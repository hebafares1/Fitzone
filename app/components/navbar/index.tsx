import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../types/navigationTypes";

const Navbar = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <View className="absolute bottom-0    w-full  bg-gray-400">
      <View className="flex-row justify-evenly w-full">
        <TouchableOpacity
          className="flex-row gap-4 items-center px-6 py-4"
          onPress={() => navigation.navigate("Home")}
        >
          <Entypo name="home" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row gap-4 items-center px-6 py-4"
          onPress={() => navigation.navigate("Search")}
        >
          <AntDesign
            name="plus"
            size={20}
            color="white"
            className="bg-blue-600 rounded-full p-2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row gap-4 items-center px-6 py-4"
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Ionicons name="person" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
