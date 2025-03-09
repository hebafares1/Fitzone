import React from "react";
import { TextInput, Text, View } from "react-native";

type TextInputFieldType = {
  text: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  secureTextEntry?: boolean;
};

const CustomTextInput: React.FC<TextInputFieldType> = ({
  text,
  placeholder,
  value,
  onChange,
  className,
  secureTextEntry,
}) => {
  return (
    <View className="gap-1">
      <Text className="text-gray-400 text-sm">{text}</Text>
      <TextInput
        className={`bg-gray-800 text-white  px-4 rounded-3xl h-14 ${className}`}
        placeholder={`${placeholder}`}
        placeholderTextColor="#A3A3A3"
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomTextInput;
