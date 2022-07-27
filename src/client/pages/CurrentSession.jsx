import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExerciseSetsCard from "../component/ExerciseSetsCard";

const CurrentSession = (props) => {
  const [sets, setSets] = useState({});
  const location = useLocation();
  const { workout } = location.state;

  useEffect(() => {
    let temp = {};
    let exercise_map = {};
    let exercise_order = [];

    workout.exercises.sort((a, b) => a.exercise_order - b.exercise_order);

    for (let exercise of workout.exercises) {
      temp[exercise.exercise_id] = [];
      exercise_order.push(exercise.exercise_id);
      exercise_map[exercise.exercise_id] = exercise;
    }

    workout["exercise_map"] = exercise_map;
    workout["exercise_order"] = exercise_order;
   
    setSets(temp);
  }, []);

  const submit = () => {
    axios
      .post("/save-session", { sets, workout })
      .then(() => {
        window.location.href = "/App/";
      })
      .catch((err) => {
        alert("Something went wrong, see console");
        console.error(err);
      });
  };

  const setCount = () => {
    let sets_added = 0;
    for (let exercise_id of Object.keys(sets)) {
      for (let set of sets[exercise_id]) {
        sets_added++;
      }
    }

    return sets_added;
  };

  return (
    <div className="Page CurrentSession">
      {workout["exercise_order"]?.map((key) => {
        return (
          <ExerciseSetsCard
            key={key}
            onSetsUpdate={(exercise_id, newSets) => {
              sets[exercise_id] = newSets;
              setSets({ ...sets });
            }}
            info={workout.exercise_map[key]}
          />
        );
      })}

      <div className="footer">
        <button disabled={setCount() === 0} onClick={submit}>
          Complete Session 🥳
        </button>
      </div>
    </div>
  );
};

export default CurrentSession;
