CREATE TABLE Users (
    user_id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    gym_id TEXT,
    FOREIGN KEY (gym_id) REFERENCES GYM
);