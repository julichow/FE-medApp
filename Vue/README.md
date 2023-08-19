# MVP - MedApp

Full Stack application created using Vue, Node/Express, and MySQL.

## Setup

### Dependencies

- Run `npm install` in MVP folder to install `express`. This will install server-related dependencies such as `express`.
- `cd Vue` and run `npm install` to‌ install Vue dependencies

### Database

- Access database called `medications` in MySQL
- Access table in medications database also called `medications`
- View the [_Database schema_](public/images/database_schema.png)
- View the [_API Routes Plan_](public/images/MedApp_routes.pdf)

### Development

- Run `npm start` in project directory, MVP folder, to start Express server on port 4000
- Run `npm run dev` in client, Vue folder, to start the client in development mode with hot reloading in port 5173.

## Purpose of the App

- Single page application where users can track medications
- On Home screen users enter the name of a medication
- On submit, users are prompted with a form to add additional information on medications being tracked
- On form submit, medication cards are created for each entry
- View the [_Flowchart_](public/images/flowchart.png)
- Users may delete medication cards

## Resources

- [MySQL Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Vue Documentation](https://vuejs.org/guide/introduction.html)
