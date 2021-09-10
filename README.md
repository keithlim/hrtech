# HRTECH

A HR management platform built using the PEAN (PostgreSQL, Express, Node.js, Angular) stack.

Current use cases supported
 - uploading of .csv files
 - viewing of employee data
 
## Technology Requirements
- [PostgreSQL] - Version used during development: 13.4
- [Express] - Version used during development: 4.17.1
- [Angular] - Version used during development: 11.1.2
- [Node.js] - Version used during development: 14.15.1
 
 
## Running on a Local Machine (on macOS)
Navigate to the folder that was extracted from the zip file downloaded [here](https://github.com/keithlim/hrtech).

### Setting up the PostgreSQL database
- Enter PostgreSQL interactive terminal via the psql command.
- Create the database.
                                
        create database hrtech;
- Establish connection to hrtech database.

        \c hrtech;
- Create the tables from the supplied DDL script.
        
        \i ddl_hrtech.sql

### Setting up the Node.js backend
- Create a .env inside the /backend folder in the project's root directory. It should have the following values to facilitate connection to Postgres:

        PG_USER= keith*
        PG_PASSWORD= *
        PG_HOST= localhost*
        PG_PORT= 5432*
        PG_DATABASE= hrtech
        NODE_ENV=DEVELOPMENT
    - *these values might vary depend on your machine's config for Postgres. These environment variables are used [here](https://github.com/keithlim/hrtech/blob/master/backend/src/db/pg-util.js).

- Navigate to the backend folder.

- Install the necessary Node packages with the command:

        npm i
        
### Setting up the Angular front-end
- Navigate to the folder that was extracted from the zip file downloaded [here](https://github.com/keithlim/hrtech).

- Install the necessary Node packages with the command:

        npm i
        
### Running the Node.js backend
- Navigate to the backend folder.

- run the backend locally with the command:

        node index.js
        
### Running the Angular front-end
- Navigate to the folder that was extracted from the zip file downloaded [here](https://github.com/keithlim/hrtech).

- run the front-end locally with the command:

        ng serve

- Navigate to http://localhost:4200/ to view HrTech in action!

[//]: #
   [PostgreSQL]: <https://formulae.brew.sh/formula/postgresql>
   [Angular]: <https://angular.io/>
   [Express]: <https://www.npmjs.com/package/express>
   [Node.js]: <https://nodejs.org/en/>
