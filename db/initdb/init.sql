CREATE DATABASE sampledb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE Users (
    userID uuid NOT NULL PRIMARY KEY,
    userType int,
    /* 0 for student, 1 for teacher*/
    lastName varchar(255),
    firstName varchar(255),
    email varchar(255),
    userClasses uuid[],
    userPassword varchar(255),
    eventIDs uuid[]
);

CREATE TABLE Classes (
    classID uuid NOT NULL PRIMARY KEY,
    className varchar(255),
    lessonids uuid[],
    studentIDs uuid[],
    instructorID uuid REFERENCES Users(userID)
);

CREATE TABLE Events (
    eventID uuid NOT NULL PRIMARY KEY,
    eventType int,
    eventName varchar(255),
    dateExpires timestamp,
    /*when the date gets passed gets deleted from table.*/
    instructorID uuid REFERENCES Users(userID),
    classID uuid REFERENCES Classes(classID)
);

CREATE TABLE Lessons (
    lessonID uuid NOT NULL PRIMARY KEY,
    lessonName varchar(255),
    lessonDescription text,
    pictureIds uuid[],
    /*picture ids*/
    instructorID uuid REFERENCES Users(userID)
);

CREATE TABLE Pictures (
    pictureID uuid NOT NULL PRIMARY KEY,
    pictureName varchar(255),
    pictureFile bytea
);

CREATE TABLE Feedback (
    feedbackID uuid NOT NULL PRIMARY KEY,
    instructorID uuid REFERENCES Users(userID),
    studentID uuid REFERENCES Users(userID),
    classID uuid REFERENCES Classes(classID),
    feedbackText text
);
