import React, { useState } from "react";
import CustomButton from "../../components/button";
import CustomTextInput from "../../components/textInput";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { showToast } from "../../utils/toastService";
import { FirebaseErrors } from "../../utils/firebaseError";
import { signUpWithEmailPassword } from "../../../auth/auth-service";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigationTypes";
import { validateEmail, validatePassword } from "../../utils/validation";

export function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<RootStackParamList>();

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      showToast(
        "error",
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }
    if (!validatePassword(password)) {
      showToast(
        "error",
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signUpWithEmailPassword({
        email,
        password,
        name,
      });
      console.log("User signed up:", userCredential);

      showToast("success", "Success", "Account created successfully!");
      navigation.navigate("SignIn");
    } catch (error) {
      //@ts-ignore

      const errorMessage = FirebaseErrors(error.code);
      showToast("error", "Sign Up Failed", errorMessage);
      console.error("Sign up error:", error);
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

            <Text className="text-gray-400 text-3xl font-bold">FitZone</Text>

            <View className="gap-4 w-[100%]">
              <CustomTextInput
                text="Name"
                placeholder="Enter Name"
                value={name}
                onChange={setName}
              />

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
            </View>

            <View className="flex-row">
              <CustomButton
                className="bg-primary"
                classNameText="text-white"
                text={isLoading ? "Signing Up..." : "Sign Up"}
                onPress={handleSignUp}
                disabled={isLoading || !name || !email || !password}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
