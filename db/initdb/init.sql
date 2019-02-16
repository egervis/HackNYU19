CREATE DATABASE sampledb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE Users (
    userID text NOT NULL PRIMARY KEY,
    userType int, /* 0 for student, 1 for teacher*/
    lastName varchar(255),
    firstName varchar(255),
    email varchar(255),
    userClasses text,
    userPassword varchar(255),
    eventIDs text /*if event not present in table, delete*/
);

CREATE TABLE Classes (
    classID text NOT NULL PRIMARY KEY,
    className varchar(255),
    lessonids text,
    studentIDs text,
    instructorID text REFERENCES Users(userID)
);

CREATE TABLE Events (
    eventID text NOT NULL PRIMARY KEY,
    eventType varchar(255),
    eventName varchar(255),
    dateExpires varchar(255), /*when the date gets passed gets deleted from table.*/
    instructorID text REFERENCES Users(userID)
);

CREATE TABLE Lessons (
    lessonID text NOT NULL PRIMARY KEY,
    lessonName varchar(255),
    lessonDescription text,
    pictureIds text, /*picture ids*/
    instructorID text REFERENCES Users(userID)
);

CREATE TABLE Pictures (
    pictureID text NOT NULL PRIMARY KEY,
    pictureName varchar(255),
    lessonID text REFERENCES Lessons(lessonID),
    pictureFile bytea
);

CREATE TABLE Feedback (
    feedbackID text NOT NULL PRIMARY KEY,
    instructorID text REFERENCES Users(userID),
    studentID text REFERENCES Users(userID)
);
