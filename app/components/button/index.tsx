import React from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonInputType = {
  className?: string;
  classNameText?: string;
  text: string;
  onPress?: () => void;
  disabled?: boolean;
};
const CustomButton: React.FC<ButtonInputType> = ({
  className,
  classNameText,
  text,
  onPress,
  disabled,
}) => {
  return (
    <>
      <TouchableOpacity
        className={` rounded-full flex-1 py-4 ${className} ${
          disabled ? "opacity-55" : ""
        }`}
        onPress={onPress}
        disabled={disabled}
      >
        <Text className={`text-center  font-semibold ${classNameText}`}>
          {text}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;
