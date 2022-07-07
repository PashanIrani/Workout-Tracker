CREATE TABLE Exercise (
	exercise_id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	target TEXT,
	equipment TEXT, 
	gif_url TEXT DEFAULT 'https://tenor.com/view/not-available-gif-14901199'
);
