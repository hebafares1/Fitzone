import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import CustomButton from "../../components/button";
import CustomTextInput from "../../components/textInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { forgotPassword } from "../../../auth/auth-service";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigationTypes";
import { FirebaseErrors } from "../../utils/firebaseError";
import { showToast } from "../../utils/toastService";

export function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation<RootStackParamList>();

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      await forgotPassword(email);
      showToast(
        "success",
        "Success",
        "Password reset email sent! Check your inbox."
      );

      navigation.navigate("SignIn");
    } catch (error: any) {
      console.error("Forgot Password error:", error);

      const errorMessage = FirebaseErrors(error.code);

      showToast("error", "Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black items-center">
      <View className="flex-1 w-[100%] flex-col justify-evenly items-center px-8">
        <View>
          <Image
            source={require("../../../assets/signInUpImg.png")}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        <Text className="text-gray-400 text-3xl font-bold ">FitZone</Text>

        <View className="gap-4 w-[100%]">
          <CustomTextInput
            text="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            className="h-14"
          />
        </View>

        <View className="flex-row">
          <CustomButton
            className="bg-primary"
            classNameText="text-white"
            text={isLoading ? "Sending..." : "Send Reset Email"}
            onPress={handleForgotPassword}
            disabled={isLoading || !email}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
