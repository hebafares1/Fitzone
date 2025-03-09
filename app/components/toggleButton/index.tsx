import React from "react";
import { View, Text, Switch } from "react-native";

type NotificationToggleProps = {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
};

export const NotificationToggle: React.FC<NotificationToggleProps> = ({
  label,
  value,
  onToggle,
}) => {
  return (
    <View className="flex-row justify-between items-center ">
      <Text className="text-white">{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#767577", true: "#1E90FF" }}
        thumbColor={value ? "#1E90FF" : "#f4f3f4"}
      />
    </View>
  );
};
