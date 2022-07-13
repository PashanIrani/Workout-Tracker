CREATE TABLE set(
	set_id  TEXT PRIMARY KEY,
	weight DECIMAL,
	reps INTEGER,
	exercise_id TEXT,
	session_id TEXT,
	set_order INTEGER,
	FOREIGN KEY (exercise_id) REFERENCES exercise,
	FOREIGN KEY (session_id) REFERENCES session ON DELETE CASCADE
    );
