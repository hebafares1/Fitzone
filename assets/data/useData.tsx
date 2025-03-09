import { useState, useEffect } from "react";

interface Exercise {
  id: number;
  name: string;
  category: string;
  target_muscle_group: string;
  equipment_needed: string;
  description: string;
  sets: number;
  reps: number;
  gif_url: string;
  duration_seconds?: number;
  img: string;
  background: string;
}

interface WorkoutData {
  exercises: Exercise[];
}

const useWorkoutData = () => {
  const [data, setData] = useState<WorkoutData | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const data: WorkoutData = require("../data/workout.json");

    setData(data);

    const uniqueCategories = [
      ...new Set(data.exercises.map((exercise: Exercise) => exercise.category)),
    ];
    setCategories(uniqueCategories);

    const uniqueMuscleGroups = [
      ...new Set(
        data.exercises.flatMap((exercise) =>
          exercise.target_muscle_group.split(",")
        )
      ),
    ];
    setMuscleGroups(uniqueMuscleGroups);

    setExercises(data.exercises);
  }, []);

  return { data, categories, muscleGroups, exercises };
};

export default useWorkoutData;
