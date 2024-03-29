CREATE TABLE session(
	session_id TEXT PRIMARY KEY,
	session_time TIMESTAMPTZ DEFAULT Now(),
	user_id TEXT,
	workout_id TEXT,
	FOREIGN KEY (user_id) REFERENCES users,
	FOREIGN KEY (workout_id) REFERENCES workout ON DELETE CASCADE
);
