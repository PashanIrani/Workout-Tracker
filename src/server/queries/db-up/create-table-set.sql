CREATE TABLE set(
	setID  TEXT PRIMARY KEY,
	weight DOUBLE,
	reps INTEGER,
	exerciseID TEXT,
	sessionID TEXT,
	order INTEGER,
	FOREIGN KEY (exerciseID) REFERENCES exercise,
	FOREIGN KEY (sessionID) REFERENCES session
    );
