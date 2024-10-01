CREATE TABLE users (
    userID INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL
);

CREATE TABLE shows (
    showID INTEGER PRIMARY KEY,
    showName TEXT NOT NULL,
    showRating FLOAT,
    showImage TEXT
);

CREATE TABLE userShows (
    userID INTEGER,
    showID INTEGER,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (showID) REFERENCES shows(showID),
    PRIMARY KEY (userID, showID)
);

INSERT into users (username, email, passwordHash)
values ('testuser', 'testuser@example.com', '$2b$10$gH0xF065ydSSh6SOCwAVe.eZDNZ76/aaH6WY.DuwNvW32SYtJw5DS');