import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../styles/AddWorkout.scss";
import { FaCheck } from "react-icons/fa";
import {
  IoMdAddCircle,
  IoMdArrowDropupCircle,
  IoMdArrowDropdownCircle,
} from "react-icons/io";
import { FixedSizeList } from "react-window";

const AddWorkout = () => {
  const [allExercises, setAllExercises] = useState([]); // holds all exercises
  const [selectedExercise, setSelectedExercise] = useState(""); // holds selected exercises
  const [workoutTitle, setWorkoutTitle] = useState(""); // holds the title for the current workout plan being created
  const [exercises, setExercises] = useState([]); // holdss the ids of the exercises that are added to the current workout plan
  const [showExerciseSelectionModal, setShowExerciseSelectionModal] =
    useState(false); // boolean value which determins if the exercise selection modal is shown

  const [exerciseList, setExerciseList] = useState([]); // The list of exercises shown when "add exercise is clicked"
  const [exerciseListFilter, setExerciseListFilter] = useState("All"); // Determines which exercise to show.
  const [exerciseTargets, setExerciseTargets] = useState([]); // Holds all the targets the exercises target

  const [isReady, setIsReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // on create effect
  useEffect(() => {
    if (history.state.exercises) {
      setExercises(history.state.exercises);
      setWorkoutTitle(history.state.workoutName);
      setIsEditing(true);
    }
    axios.get("/get-all-exercises").then((res) => {
      let temp = {};

      const targets = new Set();

      // convert array to object for fast lookups
      res.data.forEach((exercise) => {
        temp[exercise.exercise_id] = exercise;
        targets.add(exercise.target);
      });

      setExerciseTargets(Array.from(targets));
      setAllExercises(temp);
      setIsReady(true);
    });
  }, []);

  /* Updates exercise list based on filter */
  useEffect(() => {
    let newList = [];

    for (let key of Object.keys(allExercises)) {
      const e = allExercises[key];

      if (
        exerciseListFilter.toLowerCase().localeCompare("all") &&
        exerciseListFilter
          .toLowerCase()
          .localeCompare(e.target.toLowerCase()) !== 0
      )
        continue;

      newList.push(
        <div
          className={`selectable-option ${
            selectedExercise === e.exercise_id ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedExercise(e.exercise_id);
          }}
          key={e.exercise_id}
        >
          <div className="image-container">
            <img src={e.gif_url} alt={e.name} />
          </div>
          <div className="exercise-details">
            <p className="exercise-name">{e.name}</p>
            <p className="exercise-target">{e.target}</p>
          </div>
          <div className="selection-indicator">
            <FaCheck className="check" />
          </div>
        </div>
      );
    }

    setExerciseList([...newList]);
  }, [allExercises, selectedExercise, exerciseListFilter]);

  const addExerciseToWorkout = () => {
    if (!selectedExercise) return; // do nothing if no exercise is selected

    if (!exercises.includes(selectedExercise))
      setExercises([...exercises, selectedExercise]);
  };

  const exerciseSelectionModalCloseCallback = () => {
    setSelectedExercise("");
    setShowExerciseSelectionModal(false);
  };

  const exerciseSelectionModalSaveCallback = () => {
    addExerciseToWorkout();
    exerciseSelectionModalCloseCallback();
  };

  const moveExerciseUp = (index) => {
    if (index <= 0 || index >= exercises.length) return;

    let temp = exercises[index - 1];
    exercises[index - 1] = exercises[index];
    exercises[index] = temp;

    setExercises([...exercises]);
  };

  const moveExerciseDown = (index) => {
    if (index < 0 || index >= exercises.length - 1) return;

    let temp = exercises[index + 1];
    exercises[index + 1] = exercises[index];
    exercises[index] = temp;

    setExercises([...exercises]);
  };

  const removeExercise = (index) => {
    if (index < 0 || index >= exercises.length) return;

    exercises.splice(index, 1);

    setExercises([...exercises]);
  };

  const editWorkoutName = () => {
    if (workoutTitle === history.state.workoutName) {
      return;
    }
    const workout = {
      name: workoutTitle,
      id: history.state.workoutId,
    };
    axios
      .post("/edit-workout-name", { workout })
      .then(() => {
        location.href = "/App/MyWorkouts/";
      })
      .catch((err) => {
        alert("Something went wrong, see console");
        console.error(err);
      });
  };

  const editWorkout = () => {
    if (exercises === history.state.exercises) {
      location.href = "/App/MyWorkouts";
      return;
    }

    const workout = {
      exercises: [...exercises],
      id: history.state.workoutId,
    };

    axios
      .post("/edit-workout", { workout })
      .then(() => {
        location.href = "/App/MyWorkouts/";
      })
      .catch((err) => {
        alert("Something went wrong, see console");
        console.error(err);
      });
  };

  const saveWorkout = () => {
    const workout = {
      name: workoutTitle,
      exercises: [...exercises],
    };
    axios
      .post("/save-workout", { workout })
      .then(() => {
        location.href = "/App/";
      })
      .catch((err) => {
        alert("Something went wrong, see console");
        console.error(err);
      });
  };

  return isReady ? (
    <div className="Page AddWorkoutPage">
      <div className="scrollable-div">
        {!isEditing ? (
          <h2>Create a new workout... </h2>
        ) : (
          <h2>Editing workout...</h2>
        )}
        <label>Title: </label>
        <input
          type="text"
          value={workoutTitle}
          onChange={(event) => {
            setWorkoutTitle(event.target.value);
          }}
          placeholder="Please enter a workout title: "
        />
        <br />

        <Modal
          show={showExerciseSelectionModal}
          onHide={exerciseSelectionModalCloseCallback}
          backdrop="static"
          keyboard={false}
          className="exercise-selection-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select an Exercise to Add:</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <select
                name="exerciseListFilter"
                id="exerciseListFilter"
                onChange={(e) => setExerciseListFilter(e.target.value)}
              >
                <option value="all">All</option>
                {exerciseTargets.map((target) => (
                  <option key={target} value={target}>
                    {target
                      .trim()
                      .split(" ")
                      .map((t) => t[0].toUpperCase() + t.substring(1))
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>
            <FixedSizeList
              className="lazy-list"
              height={350}
              itemCount={exerciseList.length}
              itemSize={100}
              width={300}
            >
              {({ index, style }) => {
                return <div style={style}>{exerciseList[index]}</div>;
              }}
            </FixedSizeList>
          </Modal.Body>

          <Modal.Footer>
            <button onClick={exerciseSelectionModalSaveCallback}>Add</button>
          </Modal.Footer>
        </Modal>

        <button
          className="add-exercise-button"
          onClick={() => setShowExerciseSelectionModal(true)}
        >
          Add Exercise <IoMdAddCircle />
        </button>

        <div className="selected-exercises-container">
          {exercises.map((e, index) => {
            let exercise = allExercises[e];
            return (
              <div className="exercise-card" key={e}>
                <div className="exercise-card-image">
                  <img src={exercise.gif_url} alt={exercise.name} />
                </div>

                <div className="exercise-card-title">
                  <span>{exercise.name}</span>
                  <span
                    onClick={() => removeExercise(index)}
                    className="delete-button"
                  >
                    remove
                  </span>
                </div>

                <div className="exercise-card-order-controls">
                  <button onClick={() => moveExerciseUp(index)}>
                    <IoMdArrowDropupCircle />
                  </button>
                  <span>{index + 1}</span>
                  <button onClick={() => moveExerciseDown(index)}>
                    <IoMdArrowDropdownCircle />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          disabled={workoutTitle === "" || exercises.length === 0}
          onClick={() => {
            if (isEditing) {
              editWorkoutName();
              editWorkout();
            } else saveWorkout();
          }}
        >
          Save Workout
        </button>
      </div>
    </div>
  ) : (
    <p>Please wait...</p>
  );
};

export default AddWorkout;
