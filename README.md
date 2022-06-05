
# Gradebook App

## Description

This is an example application for Javascript students. It is an API for a boot camp grading platform. It utilizes Sequelize, MySQL, Express, and Javascript.

## Setup 1 (MySQL Local Installation)
### Step 1: Clone repo and install dependencies
    git clone https://github.com/hollisjamison/gradebook
    cd gradebook
    npm install
### Step 2: Run setup.sql in MySQL Workbench
### Step 3: Start the application
    npm run dev

## Setup 2 (Docker MySQL)
### Step 1: Setup repo, setup Docker database, then run the app
    git clone https://github.com/hollisjamison/gradebook
    cd gradebook
    npm install
    npm run docker:db:up
    npm run docker:db:init
    npm run dev

## API Endpoints
### /api/instructors
**GET /api/instructors**
Gets all instructors
<br />
**GET /api/instructors/id/:searchedId**
Gets instructor with searched ID
<br />
**POST /api/instructors**
Adds instructor to database
<br />
**DELETE /api/instructors/:id**
Deletes the provided instructor
<br />
**PUT /api/instructors**
Updates the provided instructor
<br />
### /api/students
**GET /api/students**
Gets all students
<br />
**GET /api/students/id/:searchedId**
Gets student with searched ID
<br />
** POST /api/students **
Adds student to database

**DELETE /api/students/:id**
Deletes the provided student
<br />
**PUT /api/students**
Updates the provided student
<br />
### /api/students
**GET /api/students**
Gets all students
<br />
**GET /api/students/id/:searchedId**
Gets student with searched ID
<br />
**POST /api/students**
Adds student to database
<br />
**DELETE /api/students/:id**
Deletes the provided student
<br />
**PUT /api/students**
Updates the provided student
<br />
### /api/assignments
**GET /api/assignments**
Gets all assignments
<br />
**GET /api/assignments/id/:searchedId**
Gets assignment with searched ID
<br />
**GET /api/assignments/student/:searchedId**
Gets all assignments that the student with searched ID is assigned
<br />
**GET /api/assignments/cohort/:searchedId**
Gets all assignments that the cohort with searched ID is assigned
<br />
**POST /api/assignments**
Adds assignment to database
<br />
**DELETE /api/assignments/:id**
Deletes the provided assignment
<br />
**PUT /api/assignments**
Updates the provided assignment
<br />
### /api/cohorts
**GET /api/cohorts**
Gets all cohorts
<br />
**GET /api/cohorts/id/:searchedId**
Gets cohort with searched ID
<br />
**GET /api/cohorts/student/:searchedId**
Gets all cohorts that the student with searched ID is assigned
<br />
**GET /api/cohorts/assignment/:searchedId**
Gets all cohorts that the assignment with searched ID is assigned
<br />
**POST /api/cohorts**
Adds cohort to database
<br />
**POST /api/cohorts/assignment**
Adds assignment to a cohort
<br />
**POST /api/cohorts/instructor**
Adds instructor to a cohort
<br />
**DELETE /api/cohorts/:id**
Deletes the provided cohort
<br />
**PUT /api/cohorts**
Updates the provided cohort
<br />
### /api/grades
**GET /api/grades**
Gets all grades
<br />
**GET /api/grades/id/:searchedId**
Gets grade with searched ID
<br />
**GET /api/grades/student/:searchedId**
Gets all grades that the student with searched ID is assigned
<br />
**GET /api/grades/assignment/:searchedId**
Gets all grades that the assignment with searched ID is assigned
<br />
**POST /api/grades**
Adds grade to database
<br />
**DELETE /api/grades/:id**
Deletes the provided grade
<br />
**PUT /api/grades**
Updates the provided grade

