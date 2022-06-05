drop database if exists gradebook;

CREATE DATABASE gradebook;

DROP USER IF EXISTS 'gradebook_user'@'%';

CREATE USER IF NOT EXISTS 'gradebook_user'@'%' IDENTIFIED BY 'gradebookP@ss';

GRANT ALL ON gradebook.* TO 'gradebook_user'@'%';

USE gradebook;

CREATE TABLE instructors (
  id INT auto_increment,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  githubUser VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id)
);

CREATE TABLE assignments (
  id INT auto_increment,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type ENUM("Classwork", "Homework", "Project") NOT NULL,
  githubURL VARCHAR(255) NOT NULL,
  assignedDate DATETIME,
  dueDate DATETIME,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id)
);

CREATE TABLE cohorts (
  id INT auto_increment,
  year INT NOT NULL,
  season VARCHAR(255) NOT NULL,
  startDate DATETIME,
  endDate DATETIME,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id)
);


CREATE TABLE cohortsAssignments (
  id INT auto_increment,
  cohortId INT NOT NULL,
  assignmentId INT NOT NULL,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  FOREIGN KEY (cohortId) REFERENCES cohorts(id),
  FOREIGN KEY (assignmentId) REFERENCES assignments(id),
  PRIMARY KEY(id)
);

CREATE TABLE cohortsInstructors (
  id INT auto_increment,
  cohortId INT NOT NULL,
  instructorId INT NOT NULL,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  FOREIGN KEY (cohortId) REFERENCES cohorts(id),
  FOREIGN KEY (instructorId) REFERENCES instructors(id),
  PRIMARY KEY(id)
);


CREATE TABLE students (
  id INT auto_increment,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  githubUser VARCHAR(255) NOT NULL,
  cohortId INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  FOREIGN KEY (cohortId) REFERENCES cohorts(id),
  PRIMARY KEY(id)
);

CREATE TABLE grades (
  id INT auto_increment,
  grade INT,
  comments VARCHAR(255),
  githubURL VARCHAR(255),
  assignmentId INT,
  studentId INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  FOREIGN KEY (assignmentId) REFERENCES assignments(id),
  FOREIGN KEY (studentId) REFERENCES students(id),
  PRIMARY KEY(id)
);

insert into instructors(firstName, lastName, githubUser)
values ("Hollis", "Jamison", "hollisjamison");

insert into assignments(name, description, type, githubURL)
values
("order-book", "Create a bitcoin order book.", "Project", "https://github.com/stackeducation/order-book"),
("tdd-strict-equal", "Implement a function that mimics a === sign in JS", "Homework", "https://github.com/stackeducation/tdd-strict-equal"),
("hazy-calculator", "Implement a hazy calculator", "Homework", "https://github.com/stackeducation/hazy-calculator")
;

insert into cohorts(year, season) values (2022, "Fall");

insert into cohortsAssignments(cohortId, assignmentId)
values
(1,1),
(1,2)
;

insert into cohortsInstructors(cohortId, instructorId)
values
(1,1)
;

insert into students(firstName, lastName, githubUser, cohortId)
values
("Shane", "Tierney", "Shane-Tierney", 1),
("Paul", "Torres", "Pault03", 1)
;

insert into grades(grade, comments, githubURL, assignmentId, studentId)
values
(100, "Great job Shane!", "https://github.com/shane-tierney/order-book",1,1),
(100, "Amazing job Shane!", "https://github.com/shane-tierney/tdd-strict-equal",2,1),
(100, "Wow Paul!", "https://github.com/pault03/tdd-strict-equal",1,2),
(100, "Awesome job Paul!", "https://github.com/pault03/tdd-strict-equal",2,2)
;
