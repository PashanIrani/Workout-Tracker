CREATE TABLE Users (
    user_id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
	-- GymID will be added after GYM Table has been created
);