import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import '../styles/AddWorkout.scss'
import { FaCheck } from 'react-icons/fa';
import { IoMdAddCircle, IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from 'react-icons/io';

const AddWorkout = () => {
    const  [allExercises, setAllExercises] = useState([]); // holds all exercises
    const  [selectedExercise, setSelectedExercise] = useState(''); // holds all exercises 
    const  [workoutTitle, setWorkoutTitle] = useState(''); // holds the title for the current workout plan being created
    const  [exercises, setExercises] = useState([]); // holdss the ids of the exercises that are added to the current workout plan
    const [showExerciseSelectionModal, setShowExerciseSelectionModal] = useState(false); // boolean value which determins if the exercise selection modal is shown

    const [isReady, setIsReady] = useState(false);
    
    // on create effect
    useEffect(() => {
      axios.get('/getAllExercises')
      .then(res => {
        let temp = {};
        
        let count = 0;
        // convert array to object for fast lookups
        res.data.forEach(exercise => {
          if (count > 50) return; // TODO: find a way to render all exercises without a performance sacrifice
          temp[exercise.id] = exercise;
          count++;
        });

        setAllExercises(temp);
        setIsReady(true);
      });
    }, []);


    const addExerciseToWorkout = () => {
      if (!selectedExercise) return; // do nothing if no exercise is selected
      
      if (!exercises.includes(selectedExercise)) setExercises([...exercises, selectedExercise]);
    };

    const exerciseSelectionModalCloseCallback = () => {
      setSelectedExercise('');
      setShowExerciseSelectionModal(false);
    }

    const exerciseSelectionModalSaveCallback = () => {
      addExerciseToWorkout();
      exerciseSelectionModalCloseCallback(); 
    }
    
    const moveExerciseUp = (index) => {
      if (index <= 0 || index >= exercises.length) return;

      let temp = exercises[index - 1];
      exercises[index - 1] = exercises[index];
      exercises[index] = temp;

      setExercises([...exercises]);
    }

    const moveExerciseDown = (index) => {
      if (index < 0 || index >= exercises.length - 1) return;

      let temp = exercises[index + 1];
      exercises[index + 1] = exercises[index];
      exercises[index] = temp;

      setExercises([...exercises]);

    }

    const saveWorkout = () => {
      const workout = {
        name: workoutTitle,
        exercises: [...exercises]
      }

      console.log(workout); 
      // TODO: Save to DB
    }

    return isReady ? (
      <div className="Page AddWorkoutPage">
          <h2>Create a new workout... </h2>
          <label>Title: </label>
          <input type="text" value={workoutTitle} onChange={event => {setWorkoutTitle(event.target.value)}} placeholder="Please enter a workout title: "/>
          <br/>
          
         
          <Modal show={showExerciseSelectionModal} 
            onHide={exerciseSelectionModalCloseCallback}
            backdrop="static"
            keyboard={false}
            className="exercise-selection-modal">
              <Modal.Header closeButton>
                <Modal.Title>Select an Exercise to Add:</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              {Object.keys(allExercises).map(key => allExercises[key]).map(e => {
                return (<div 
                  className={`selectable-option ${selectedExercise === e.id ? 'selected' : ''}`} 
                  onClick={() => { setSelectedExercise(e.id); }}
                  key={e.id}>
                    <div><img src={e.gifUrl} alt={e.name}/></div>
                    <div className="exercise-details">
                      <p className="exercise-name">{e.name}</p>
                      <p className="exercise-target">{e.target}</p>
                    </div>
                    <div className="selection-indicator"><FaCheck className="check"/></div>
                  </div>)
              })}
              </Modal.Body>

              <Modal.Footer>
                <button onClick={exerciseSelectionModalSaveCallback}>Add</button>
              </Modal.Footer>
          </Modal>

          <button className="add-exercise-button" onClick={() => setShowExerciseSelectionModal(true)}>Add Exercise <IoMdAddCircle /></button>
          
          <div className="selected-exercises-container">
            {
              exercises.map((e, index) => {
                let exercise = allExercises[e];
                return (<div className="exercise-card" key={e}>
                  <div className="exercise-card-image">
                  <img src={exercise.gifUrl} alt={exercise.name} />
                  </div>
                  
                  <div className="exercise-card-title">
                    <span>{exercise.name}</span>
                  </div>
                  
                  <div className="exercise-card-order-controls">
                    <button onClick={() => moveExerciseUp(index)}><IoMdArrowDropupCircle /></button>
                    <span>{index + 1}</span>
                    <button onClick={() => moveExerciseDown(index)}><IoMdArrowDropdownCircle /></button>
                  </div>
                  
                  </div>)
              })
            }
          </div>
          
          <button disabled={workoutTitle === '' || exercises.length === 0} onClick={saveWorkout}>Save Workout</button>
      </div>
    ) : (<p>Please wait...</p>);
    
}

export default AddWorkout;