CREATE TABLE WORKOUT_EXERCISE (
	workout_id TEXT NOT NULL,
	-- exercise_id TEXT NOT NULL,
	exercise_order INTEGER NOT NULL,
	PRIMARY KEY (workout_id),
    -- add exercise_id to PK when table created
	FOREIGN KEY (workout_id) REFERENCES WORKOUT
	-- FOREIGN KEY (exercise_id) REFERENCES EXERCISE
);