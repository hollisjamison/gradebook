
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
**GET /api/instructors**\
Gets all instructors

**GET /api/instructors/id/:searchedId**\
Gets instructor with searched ID

**POST /api/instructors**\
Adds instructor to database

**DELETE /api/instructors/:id**\
Deletes the provided instructor

**PUT /api/instructors**\
Updates the provided instructor

### /api/students
**GET /api/students**\
Gets all students

**GET /api/students/id/:searchedId**\
Gets student with searched ID

**POST /api/students**\
Adds student to database

**DELETE /api/students/:id**\
Deletes the provided student

**PUT /api/students**\
Updates the provided student

### /api/students
**GET /api/students**\
Gets all students

**GET /api/students/id/:searchedId**\
Gets student with searched ID

**POST /api/students**\
Adds student to database

**DELETE /api/students/:id**\
Deletes the provided student

**PUT /api/students**\
Updates the provided student

### /api/assignments
**GET /api/assignments**\
Gets all assignments

**GET /api/assignments/id/:searchedId**\
Gets assignment with searched ID

**GET /api/assignments/student/:searchedId**\
Gets all assignments that the student with searched ID is assigned

**GET /api/assignments/cohort/:searchedId**\
Gets all assignments that the cohort with searched ID is assigned

**POST /api/assignments**\
Adds assignment to database

**DELETE /api/assignments/:id**\
Deletes the provided assignment

**PUT /api/assignments**\
Updates the provided assignment

### /api/cohorts
**GET /api/cohorts**\
Gets all cohorts

**GET /api/cohorts/id/:searchedId**\
Gets cohort with searched ID

**GET /api/cohorts/student/:searchedId**\
Gets all cohorts that the student with searched ID is assigned

**GET /api/cohorts/assignment/:searchedId**\
Gets all cohorts that the assignment with searched ID is assigned

**POST /api/cohorts**\
Adds cohort to database

**POST /api/cohorts/assignment**\
Adds assignment to a cohort

**POST /api/cohorts/instructor**\
Adds instructor to a cohort

**DELETE /api/cohorts/:id**\
Deletes the provided cohort

**PUT /api/cohorts**\
Updates the provided cohort

### /api/grades
**GET /api/grades**\
Gets all grades

**GET /api/grades/id/:searchedId**\
Gets grade with searched ID

**GET /api/grades/student/:searchedId**\
Gets all grades that the student with searched ID is assigned

**GET /api/grades/assignment/:searchedId**\
Gets all grades that the assignment with searched ID is assigned

**POST /api/grades**\
Adds grade to database

**DELETE /api/grades/:id**\
Deletes the provided grade

**PUT /api/grades**\
Updates the provided grade

