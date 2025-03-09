export type RootStackParamList = {
  navigate(arg0: string): void;
  WelcomePage: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Search: undefined;
  Workout: {
    exerciseName?: string;
    exerciseDes?: string;
    selectedDifficulty?: string;
    duration?: string;
    selectedWorkout?: string;
  };
  ExerciseSteps: {
    title: string;
    exerciseDes: string;
    img: string;
    gif_url: string;
    repNumber: number;
    setsNumber: number;
    duration: number;
  };
  ForgotPassword: undefined;
  SettingsScreen: undefined;
};
