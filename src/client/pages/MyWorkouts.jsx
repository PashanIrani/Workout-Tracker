import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/MyWorkouts.scss'
import '../styles/AddWorkout.scss'
import WorkoutCard from "../component/WorkoutCard";

const MyWorkouts = () => {
  
  const [workouts, setWorkouts] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(()=>{
    retrieveWorkouts();
  },[])
  const retrieveWorkouts = () => {
    axios
      .get("/retrieve-workouts")
      .then(res => {
        retrieveExercises(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const retrieveExercises = (res) => {
    let MyWorkouts = [];
    res.data.forEach(workout=> {
    axios
      .post("/retrieve-workout-exercises", {workout})
      .then((resp)=> {
        workout.exercises = resp.data;
        MyWorkouts.push(workout);
        if (MyWorkouts.length === res.data.length)
        {
          console.log(MyWorkouts);
          setWorkouts(MyWorkouts)
          setIsReady(true);
        }
      })
    })
      
  }
  
  return isReady ? (
    <div className="Page MyWorkoutsPage">
      
    <div className="selected-workouts-container">
    {
        workouts.map((e) => {
          return (<WorkoutCard key={e.workout_id} workout={e} />)
        })
      }
    </div>

    
    </div>
  ):<p></p>
}

export default MyWorkouts;
