import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/CurrentSession.scss";
import { BiMinusCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const SetCard = (props) => {
  let { weight, reps, index, id } = props;

  const [weightValue, setWeightValue] = useState(weight);
  const [repValue, setRepValue] = useState(reps);
  const [smallDeleteButton, setSmallDeleteButton] = useState(
    window.matchMedia("(max-width: 650px)").matches
  );

  const updateValue = (value, setter, increment) => {
    let newValue = value + increment;
    setter(newValue > 0 ? newValue : 0);
  };

  useEffect(() => {
    window
      .matchMedia("(max-width: 650px)")
      .addEventListener("change", (e) => setSmallDeleteButton(e.matches));
  }, []);

  useEffect(() => {
    props.onUpdate({
      id,
      weight: weightValue,
      reps: repValue,
    });
  }, [repValue, weightValue]);

  return (
    <div className="SetCard">
      <div className="set-indicator">
        <span>Set</span>
        <span>{index + 1}</span>
        {smallDeleteButton && (
          <span className="delete-button">
            <button
              className="secondary"
              onClick={() => props.onDelete(props.index)}
            >
              <MdDeleteForever />
            </button>
          </span>
        )}
      </div>

      <div className="input-container">
        <div>
          <div className="input-label">Weight</div>
          <div className="input-value">
            <button
              className="secondary"
              disabled={weightValue === 0}
              onClick={() => {
                updateValue(weightValue, setWeightValue, -5);
              }}
            >
              <BiMinusCircle />
            </button>
            <span>{weightValue} lbs</span>
            <button
              className="secondary"
              onClick={() => {
                updateValue(weightValue, setWeightValue, 5);
              }}
            >
              <IoMdAddCircle />
            </button>
          </div>
        </div>

        <div>
          <div className="input-label">Reps</div>
          <div className="input-value">
            <button
              disabled={repValue === 1}
              className="secondary"
              onClick={() => {
                updateValue(repValue, setRepValue, -1);
              }}
            >
              <BiMinusCircle />
            </button>
            <span>{repValue}</span>
            <button
              className="secondary"
              onClick={() => {
                updateValue(repValue, setRepValue, 1);
              }}
            >
              <IoMdAddCircle />
            </button>
          </div>
        </div>

        <div className="delete-button-container">
          <button
            className="secondary"
            onClick={() => props.onDelete(props.index)}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetCard;
