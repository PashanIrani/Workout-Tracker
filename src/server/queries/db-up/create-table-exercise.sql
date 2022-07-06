CREATE TABLE Exercise (
	exerciseID TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	target TEXT,
	equipment TEXT, 
	gifURL TEXT DEFAULT 'https://tenor.com/view/not-available-gif-14901199'
);
