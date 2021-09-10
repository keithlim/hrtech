# HRTECH

A HR management platform built using the PEAN (PostgreSQL, Express, Node.js, Angular) stack.

Current use cases supported
 - uploading of .csv files
    - Note that each upload of a .csv file will store a copy in the path  **resources/static/assets/uploads folder**. It is ok to delete them.
 - viewing of employee data
 - testing of API from user story 1 & user story 2
 
## Technology Requirements
- [PostgreSQL] - Version used during development: 13.4
- [Express] - Version used during development: 4.17.1
- [Angular] - Version used during development: 11.1.2
- [Node.js] - Version used during development: 14.15.1
 
 
## Running on a Local Machine (on macOS)
In your terminal, navigate to the folder that was extracted from the zip file downloaded [here](https://github.com/keithlim/hrtech).

### Setting up the PostgreSQL database
- Enter PostgreSQL interactive terminal via the psql command.
- Create both normal and test databases (hrtech & test_hrtech).
                                
        \i create_db.sql

- Establish connection to test_hrtech database.

        \c test_hrtech;
        
- Create the tables from the supplied DDL script.
        
        \i ddl_hrtech.sql

- Establish connection to hrtech database.

        \c hrtech;
- Create the tables from the supplied DDL script.
        
        \i ddl_hrtech.sql

### Setting up the Node.js backend
- Create a .env inside the /backend folder in the project's root directory. It should have the following values to facilitate connection to Postgres:

        PG_USER= * keith 
        PG_PASSWORD= *
        PG_HOST= * localhost 
        PG_PORT= * 5432 
        PG_DATABASE= hrtech
        NODE_ENV=DEVELOPMENT
    - *these values might vary depend on your machine's config for Postgres. These environment variables are used [here](https://github.com/keithlim/hrtech/blob/master/backend/src/db/pg-util.js).

- In another terminal, navigate to the backend folder.

- Install the necessary Node packages with the command:

        npm i
        
### Setting up the Angular front-end
- Navigate to the folder (root folder) that was extracted from the zip file downloaded [here](https://github.com/keithlim/hrtech).

- Install the necessary Node packages with the command:

        npm i
        
### Running the Node.js backend
- Navigate to the backend folder.

- Run the backend locally with the command:

        node index.js
        
### Running the Angular front-end
- Open another terminal and navigate to the folder (root folder) that was extracted from the zip file downloaded [here](https://github.com/keithlim/hrtech).

- Run the front-end locally with the command:

        ng serve

- Navigate to http://localhost:4200/ to view HrTech in action!

## Testing
Ensure devDependencies have been installed as the Node.js backend has specified the testing & assertion frameworks under *devDependencies*.
- Navigate to the **backend** folder and run:

        npm test

The *test* script will set the environment variable *PG_DATABASE* to the testing database (*test_hrtech*) and auto exit once all tests have finished running. Note that each round of testing will upload several .csv files to the **resources/static/assets/uploads** folder. It is ok to delete them after each round of testing.

### Coverage
The files that handle the testing are located [here](https://github.com/keithlim/hrtech/tree/master/backend/test) in this folder. They use [Mocha] JavaScript testing framework and [Chai] JavaScript assertion libray.

- Uploading of Csv files
- Retrieving employee data

## Project Assumptions
- **Database**, *id* & *login* fields are not null, do not have a maximum length and is case-sensitive
- **User Story 2**, the user will be presented a button to load the next set of employee data (up to 30) with the same params once he has reached the last page of data from his current query
- **User Story 2**, the */users* API can only be supplied the *minSalary* & *maxSalary* query parameters. For *offset*, it will be handled by the Angular application and the *sort* will default to displaying records in ascending order based on their alphanumeric *id*.

[//]: #
   [PostgreSQL]: <https://formulae.brew.sh/formula/postgresql>
   [Angular]: <https://angular.io/>
   [Express]: <https://www.npmjs.com/package/express>
   [Node.js]: <https://nodejs.org/en/>
   [Mocha]: <https://mochajs.org/>
   [Chai]: <https://www.chaijs.com/>
