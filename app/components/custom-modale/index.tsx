import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  onClose,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-4/5">
          <Text className="text-xl font-bold text-black">{title}</Text>
          <Text className="text-gray-600 mt-2">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-primary p-2 rounded-md"
          >
            <Text className="text-white text-center">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
