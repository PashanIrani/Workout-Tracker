CREATE TABLE WEIGHT_LOG(
	user_id TEXT NOT NULL,
	bodylog_id TEXT NOT NULL,
	time TIMESTAMPTZ NOT NULL,
	weight DECIMAL NOT NULL,
	PRIMARY KEY (user_id, bodylog_id),
	FOREIGN KEY (user_id) REFERENCES USERS
);
