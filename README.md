# Tasks CRUD UI
1. Implemented Signup / Login screens for authentication
2. Implemented tasks manager ui
3. Create / Edit / Delete / Get tasks on the ui
4. Backend Integrations
5. Logout functionality
6. Filters
    -- text search (realtime)
    -- local search on ID, title, description
    -- priority and status (realtime)
7. Responsive UI

<hr />

## Tech stack
 - React / Typescript / Javascript
 - CSS
 - REST APIs
 - Material ui
 - Mongo db
 - Express
 - jest / React testing library
 
### Screenshots
![Alt text](image.png)

![Alt text](image-1.png)

![Alt text](image-2.png)

![Alt text](image-3.png)

![Alt text](image-4.png)

![Alt text](image-5.png)

![Alt text](image-6.png)

## Bonus Features:
1. Implemented client search functionality for other fields
2. Test cases (FE) - 45% coverage
3. Debouncing the text search by 1s, to avoid frequent api calls
4. Logout functionality
5. Export as CSV / Print Preview

### Running the app locally

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed.
2. From the project folder, execute the following commands:

To clone the project
```shell
  git clone git@github.com:RajeshSivanesan/tasks-crud-with-ui.git
  OR
  git clone https://github.com/RajeshSivanesan/tasks-crud-with-ui.git
```

Move to the directory
```shell
  cd tasks-crud-with-ui
```

### To run FE
```shell
  cd client
```

To install dependencies:
```shell
  npm install
```

To run the app:
```shell
  npm run dev
```

To launch the ui:
```shell
  Please check the url which prints post npm run dev
  Default - http://localhost:5173/
  If the port is busy, it will pick the next one - 5174
  so always keep an eye on the port number
```

To run the tests:
```shell
  npm run test:coverage
```

### To run BE
```shell
  cd server
```

To install dependencies:
```shell
  npm install --force
```

To run the app:
```shell
  npm run compile
  npm run pre:dev
```
