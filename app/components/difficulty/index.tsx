import React from "react";
import { Text, TouchableOpacity } from "react-native";

type DifficultyFieldType = {
  text: string;
  onPress?: () => void;
  isSelected: boolean;
};

const DifficultyTypes: React.FC<DifficultyFieldType> = ({
  text,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-2 rounded-md ${isSelected ? "bg-blue-600" : "bg-gray-600"}`}
    >
      <Text className="text-white font-bold">{text}</Text>
    </TouchableOpacity>
  );
};
export default DifficultyTypes;
