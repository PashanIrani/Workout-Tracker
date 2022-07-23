import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage.scss";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import dateFormat from "dateformat";
import helpers from "../helpers";
import { MdAdd } from "react-icons/md";
import Avatar from "boring-avatars";

const { Dates } = helpers;

const ProfilePage = () => {
  // the values in this "enum" will also be shown to the user
  const LogState = {
    BODY_WEIGHT: "BW",
    FAT_PERCENTAGE: "FP",
    NOTHING: "NOTHING",
  };

  const [username, setUsername] = useState("");
  const [showNewLogModal, setShowNewLogModal] = useState(false);
  const [isCurrentlyLogging, setIsCurrentlyLogging] = useState(
    LogState.NOTHING
  );

  const [dateValue, setDateValue] = useState(new Date());
  const [value, setValue] = useState(0);
  const [modalLabels, setModalLabels] = useState({});
  const [bodyWeightPoints, setBodyWeightPoints] = useState([]);
  const [fatPercentagePoints, setFatPercentagePoints] = useState([]);

  const fetchBodyLogs = () => {
    axios.get(`/get-body-logs?type=${LogState.BODY_WEIGHT}`).then((res) => {
      const { data } = res;
      data.sort(function (a, b) {
        return Dates.compare(new Date(a.time), new Date(b.time));
      });

      setBodyWeightPoints(
        res.data.map((point) => ({
          name: dateFormat(new Date(point.time), "mm/dd/yy"),
          BW: point.value,
        }))
      );
    });

    axios.get(`/get-body-logs?type=${LogState.FAT_PERCENTAGE}`).then((res) => {
      const { data } = res;
      data.sort(function (a, b) {
        return Dates.compare(new Date(a.time), new Date(b.time));
      });

      setFatPercentagePoints(
        res.data.map((point) => ({
          name: dateFormat(new Date(point.time), "mm/dd/yy"),
          FP: point.value,
        }))
      );
    });
  };

  useEffect(() => {
    axios.get("/user-info").then((res) => {
      setUsername(res.data.name);
    });

    fetchBodyLogs();
  }, []);

  useEffect(() => {
    switch (isCurrentlyLogging) {
      case LogState.BODY_WEIGHT:
        setModalLabels({
          timeLabel: "Time: ",
          valueLabel: "Weight: ",
          valueSuffix: "lbs",
        });
        break;
      case LogState.FAT_PERCENTAGE:
        setModalLabels({
          timeLabel: "Time: ",
          valueLabel: "Fat Percentage: ",
          valueSuffix: "%",
        });
        break;
      default:
        setModalLabels({});
        break;
    }
  }, [isCurrentlyLogging]);

  const newLogModalHideCallback = () => {
    setIsCurrentlyLogging(LogState.NOTHING);
    setShowNewLogModal(false);
    setValue(0);
  };

  const saveNewLog = () => {
    axios
      .post("/save-body-log", {
        type: isCurrentlyLogging,
        data: { time: dateValue, value: value },
      })
      .then(() => {
        newLogModalHideCallback();
        fetchBodyLogs();
      })
      .catch(() => {
        console.log("Something Went Wrong!");
      });
  };

  const openNewLogModal = (state) => {
    setShowNewLogModal(true);

    let defaultValue = 0;

    switch (state) {
      case LogState.BODY_WEIGHT:
        if (bodyWeightPoints.length > 0) {
          defaultValue = bodyWeightPoints[bodyWeightPoints.length - 1].value;
        }
        break;

      case LogState.FAT_PERCENTAGE:
        if (fatPercentagePoints.length > 0) {
          defaultValue =
            fatPercentagePoints[fatPercentagePoints.length - 1].value;
        }
        break;
    }

    setValue(defaultValue);
    setIsCurrentlyLogging(state);
  };

  return (
    <div className="Page Profile-Page">
      <div className="header">
        <Avatar
          size={105}
          name={username}
          variant="beam"
          colors={["#07F9A2", "#09C184", "#0A8967", "#0C5149", "#0D192B"]}
        />
        <span>{username}</span>
      </div>

      <div className="body-logs-section">
        <h2>Body Logs</h2>
        <div className="body-logs-container">
          <div>
            <h4>Body Weight:</h4>
            <div>
              <ResponsiveContainer width="80%" height={200}>
                <LineChart data={bodyWeightPoints}>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "none",
                      border: "none",
                    }}
                    formatter={(value, name, props) => `${value} lbs`}
                    labelFormatter={(value, name, props) => `On ${value}`}
                  />
                  <Line type="monotone" dataKey="BW" stroke="#fddcbc" />
                  <XAxis
                    dataKey="name"
                    interval="preserveStartEnd"
                    fill="#33395B"
                    tick={{ fill: "#8884d8" }}
                    tickLine={{ stroke: "#33395B" }}
                    axisLine={{ stroke: "#33395B" }}
                  />
                  <YAxis
                    domain={[
                      Math.min(...bodyWeightPoints.map((point) => point.BW)),
                      Math.max(...bodyWeightPoints.map((point) => point.BW)),
                    ]}
                    type="number"
                    interval="preserveStartEnd"
                    tick={{ fill: "#8884d8" }}
                    tickLine={{ stroke: "#33395B" }}
                    axisLine={{ stroke: "#33395B" }}
                    label={{
                      value: "lbs",
                      fill: "#8884d8",
                      angle: -90,
                      offset: 15,
                    }}
                  ></YAxis>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <button
              className="secondary"
              onClick={() => {
                openNewLogModal(LogState.BODY_WEIGHT);
              }}
            >
              <MdAdd /> Log Body Weight
            </button>
          </div>

          <div>
            <h4>Body Fat Percentage:</h4>
            <div>
              <ResponsiveContainer width="80%" height={200}>
                <LineChart data={fatPercentagePoints}>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "none",
                      border: "none",
                    }}
                    formatter={(value, name, props) => `${value} %`}
                    labelFormatter={(value, name, props) => `On ${value}`}
                  />
                  <Line type="monotone" dataKey="FP" stroke="#fddcbc" />
                  <XAxis
                    dataKey="name"
                    interval="preserveStartEnd"
                    tick={{ fill: "#8884d8" }}
                    tickLine={{ stroke: "#33395B" }}
                    axisLine={{ stroke: "#33395B" }}
                  />
                  <YAxis
                    tick={{ fill: "#8884d8" }}
                    tickLine={{ stroke: "#33395B" }}
                    axisLine={{ stroke: "#33395B" }}
                    interval="preserveStartEnd"
                    domain={[
                      Math.min(...fatPercentagePoints.map((point) => point.FP)),
                      Math.max(...fatPercentagePoints.map((point) => point.FP)),
                    ]}
                    label={{
                      value: "lbs",
                      fill: "#8884d8",
                      angle: -90,
                      offset: 15,
                    }}
                  ></YAxis>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <button
              className="secondary"
              onClick={() => {
                openNewLogModal(LogState.FAT_PERCENTAGE);
              }}
            >
              <MdAdd /> Log Fat Percentage
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showNewLogModal}
        onHide={newLogModalHideCallback}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log new {isCurrentlyLogging}:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {modalLabels.timeLabel}{" "}
            <DatePicker
              showTimeSelect
              selected={dateValue}
              onChange={(date) => setDateValue(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              maxDate={new Date()}
              minTime={
                dateValue.toDateString() === new Date().toDateString()
                  ? new Date(new Date().setHours(0, 0, 0, 0))
                  : null
              }
              maxTime={
                dateValue.toDateString() === new Date().toDateString()
                  ? new Date()
                  : null
              }
            />
          </div>
          <div>
            {modalLabels.valueLabel}
            <input
              type="number"
              value={value}
              onInput={(e) => setValue(e.target.value)}
            />
            {modalLabels.valueSuffix}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={saveNewLog}>Add</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
