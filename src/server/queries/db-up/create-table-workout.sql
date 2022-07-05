CREATE TABLE Workout (
    workout_id CHAR(32) PRIMARY KEY,
    name CHAR(32) NOT NULL,
    user_id CHAR(8) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users 
);