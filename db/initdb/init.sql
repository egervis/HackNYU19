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
    userPassword varchar(255),
);

CREATE TABLE UsersClasses (
    userID text REFERENCES Users(userID),
    classID text REFERENCES Classes(classID)
);

CREATE TABLE UsersEvents (
    userID text REFERENCES Users(userID),
    eventID text REFERENCES Events(eventID)
);

CREATE TABLE Classes (
    classID text NOT NULL PRIMARY KEY,
    className varchar(255),
    instructorID text REFERENCES Users(userID)
);

CREATE TABLE ClassLessons (
    classID text REFERENCES Classes(classID),
    lessonID text REFERENCES Lessons(lessonID)
);

CREATE TABLE ClassStudents (
    classID text REFERENCES Classes(classID),
    studentID text REFERENCES Users(userID)
);

CREATE TABLE Events (
    eventID text NOT NULL PRIMARY KEY,
    eventType int,
    eventName varchar(255),
    dateExpires varchar(255), /*when the date gets passed gets deleted from table.*/
    instructorID text REFERENCES Users(userID),
    classID text REFERENCES Classes(classID)
);

CREATE TABLE Lessons (
    lessonID text NOT NULL PRIMARY KEY,
    lessonName varchar(255),
    lessonDescription text,
    instructorID text REFERENCES Users(userID)
);

CREATE TABLE LessonPictures (
    lessonID text REFERENCES Lessons(lessonID),
    pictureID text REFERENCES Pictures(pictureID)
);

CREATE TABLE Pictures (
    pictureID text NOT NULL PRIMARY KEY,
    pictureName varchar(255),
    pictureFile bytea
);

CREATE TABLE Feedback (
    feedbackID text NOT NULL PRIMARY KEY,
    instructorID text REFERENCES Users(userID),
    studentID text REFERENCES Users(userID),
    classID text REFERENCES Classes(classID),
    feedbackText text
);
