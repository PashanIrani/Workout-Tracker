CREATE TABLE Users (
    userID CHAR(8) PRIMARY KEY NOT NULL,
    name CHAR(32) NOT NULL,
    email CHAR(32) NOT NULL UNIQUE,
    password CHAR(32) NOT NULL
	-- GymID will be added after GYM Table has been created
);