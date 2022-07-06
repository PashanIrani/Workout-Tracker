CREATE TABLE gym (
	gymID TEXT PRIMARY KEY,
	Name TEXT,
	Street_address TEXT,
	Postal_code TEXT,
	FOREIGN KEY (Postal_code) REFERENCES address
);
