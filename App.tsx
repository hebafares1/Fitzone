import "./global.css";
import { WelcomePage } from "./app/screen/welcome";
import { SignUp } from "./app/screen/sign-up";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/navigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "./app/screen/sign-in";
import Toast from "react-native-toast-message";
import { ForgotPassword } from "./app/screen/forget-password";
import { Home } from "./app/screen/home_page";
import { Search } from "./app/screen/search_page";
import { WorkoutDetails } from "./app/screen/workout_details";
import { ExerciseSteps } from "./app/screen/exerciseSteps";
import { SettingsScreen } from "./app/screen/user-setting";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (refreshToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking refreshToken:", error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuthenticated ? "Home" : "WelcomePage"}
      >
        {!isAuthenticated && (
          <>
            <Stack.Screen name="WelcomePage" component={WelcomePage} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn">
              {(props) => <SignIn {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
        {isAuthenticated && (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Workout" component={WorkoutDetails} />
            <Stack.Screen name="ExerciseSteps" component={ExerciseSteps} />
            <Stack.Screen name="SettingsScreen">
              {(props) => (
                <SettingsScreen {...props} handleLogout={handleLogout} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
