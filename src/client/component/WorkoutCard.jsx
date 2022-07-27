import React, { useEffect, useState } from "react";
import AddWorkout from "../pages/AddWorkout";
import axios from "axios";
import "../styles/MyWorkouts.scss";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

const WorkoutCard = (props) => {
  const [showExercises, setShowExercises] = useState(false);
  const [exerciseIds, setExerciseIds] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const workout = props.workout;
  const navigate = useNavigate();

  const deleteWorkouts = () => {
    axios.post("/delete-workouts", { workout }).then(
      (res) => {
        location.reload();
      },
      (error) => {
        console.log("error");
      }
    );
  };

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
        className="workouts-card-container"
        onClick={() => {
          if (!showExercises) setShowExercises(true);
          else setShowExercises(false);
        }}
      >
        <div className="workouts-card-header">
          <Col span="2" className="workout-card-title">
            <span>{workout.name}</span>
          </Col>

          <Col span="2" className="button-group">
            <span
              onClick={() =>
                navigate("/App/CurrentSession", { state: { workout } })
              }
              className="start-button"
            >
              Start
            </span>
          </Col>
        </div>
        {showExercises && (
          <div>
            <div className="exercises-container">
              {workout.exercises.map((item, index) => {
                return (
                  <div key={item.gif_url}>
                    <div className="exercise-title">
                      <img src={item.gif_url} />
                      <span>
                        {index + 1}. {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="button-group">
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
                <MdEdit />
              </span>

              <span className="my-buttons" onClick={deleteWorkouts}>
                <MdDelete />
              </span>
            </div>
          </div>
        )}
      </div>
    )
  );
};
export default WorkoutCard;
