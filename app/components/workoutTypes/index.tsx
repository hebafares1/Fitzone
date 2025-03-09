import React from "react";
import { Text, TouchableOpacity } from "react-native";

type WorkoutTypesProps = {
  text: string;
  isSelected: boolean;
  onPress: () => void; // New prop to handle selection
};

const WorkoutTypes: React.FC<WorkoutTypesProps> = ({
  text,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center gap-4 rounded-3xl py-2 px-4 ${
        isSelected ? "bg-blue-500" : "bg-black"
      }`}
    >
      <Text
        className={`font-bold ${isSelected ? "text-white" : "text-gray-400"}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default WorkoutTypes;
