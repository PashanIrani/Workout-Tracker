import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyWorkouts.scss";
import { Col, Row } from "react-bootstrap";
const WorkoutCard = (props) => {
  const [showExercises, setShowExercises] = useState(false);
  const [exerciseIds, setExerciseIds] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const workout = props.workout;
  useEffect(() => {
    let ids = [];
    workout.exercises.forEach((exercise) => {
      ids.push(exercise.exercise_id);
    });
    if (ids.length === workout.exercises.length) {
      setExerciseIds(ids);
      setIsReady(true);
    }
  }, []);
  return (
    isReady && (
      <div
        className="workouts-card"
        onClick={() => {
          if (!showExercises) setShowExercises(true);
          else setShowExercises(false);
        }}
      >
        <Col span="2" className="workout-card-title">
          <span>{workout.name}</span>
        </Col>

        <Col span="4">
          {showExercises &&
            workout.exercises.map((item) => {
              return (
                <div key={item.gif_url}>
                  <div className="exercise-title">
                    <span>{item.name}</span>
                  </div>
                </div>
              );
            })}
        </Col>

        {showExercises && (
          <Col span="2" className="button-group">
            <span
              className="my-buttons"
              onClick={() => {
                window.history.pushState(
                  {
                    exercises: exerciseIds,
                    workoutName: workout.name,
                    workoutId: workout.workout_id,
                  },
                  "",
                  "/App/AddWorkout/"
                );
                history.go();
              }}
            >
              Edit
            </span>
            <span className="my-buttons">Delete</span>
          </Col>
        )}

        <Col span="2" className="button-group">
          <span className="start-button">Start</span>
        </Col>
      </div>
    )
  );
};
export default WorkoutCard;
