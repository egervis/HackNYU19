CREATE DATABASE sampledb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE Users (
    userID int NOT NULL PRIMARY KEY,
    userType int, /* 0 for student, 1 for teacher*/
    lastName varchar(255),
    firstName varchar(255),
    email varchar(255),
    password varchar(255),
    eventIDs text /*if event not present in table, delete*/
);

CREATE TABLE Classes (
    classCRN int NOT NULL PRIMARY KEY,
    className varchar(255),
    studentIDs text,
    instructorID int REFERENCES Users(userID)
);

CREATE TABLE Events (
    eventID int NOT NULL PRIMARY KEY,
    eventType varchar(255),
    eventName varchar(255),
    dateExpires varchar(255), /*when the date gets passed gets deleted from table.*/
    instructorID int REFERENCES Users(userID)
);

CREATE TABLE Lessons (
    lessonID int NOT NULL PRIMARY KEY,
    lessonName varchar(255),
    lessonDescription text,
    pictureIds text, /*picture ids*/
    instructorID int REFERENCES Users(userID)
);

CREATE TABLE Pictures (
    pictureID int NOT NULL PRIMARY KEY,
    pictureName varchar(255),
    lessonID int REFERENCES Lessons(lessonID)
);
