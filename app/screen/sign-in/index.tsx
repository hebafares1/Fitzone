import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/button";
import CustomTextInput from "../../components/textInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginWithEmailPassword } from "../../../auth/auth-service";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../utils/toastService";
import { FirebaseErrors } from "../../utils/firebaseError";

type Signin = {
  handleLogin: () => void;
};
export const SignIn: React.FC<Signin> = ({ handleLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<RootStackParamList>();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const userCredential = await loginWithEmailPassword({ email, password });
      const refreshToken = userCredential.user.refreshToken;
      await AsyncStorage.setItem("refreshToken", refreshToken);

      showToast("info", "Info", "Welcome back");
      handleLogin();
    } catch (error) {
      // @ts-ignore
      const errorMessage = FirebaseErrors(error.code);
      showToast("error", "Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                placeholder="Enter Email"
                value={email}
                onChange={setEmail}
              />

              <CustomTextInput
                text="Password"
                placeholder="Enter Password"
                value={password}
                onChange={setPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text className="text-gray-400 text-right underline">
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row">
              <CustomButton
                className="bg-primary"
                classNameText="text-white"
                text={isLoading ? "Signing In..." : "Sign In"}
                onPress={handleSignIn}
                disabled={isLoading || !email || !password}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
