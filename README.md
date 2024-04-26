## Book Management backend application

This is a backend application of Book management service, where user can add, update, edit and delete books,get all books

---

### Feature

- User authentication and authorization using JWT/JOI module for validation.
- User Registration.
- Login.
- Add books with title, author name , publish year
- Edit any of the above data of the books which are already been added
- Get all the books available in Data base
- Delete Book (soft Delete)
- filter book using Author name

---

### API's

- Login api [ http://localhost:4000/login ]
- User Registration [ http://localhost:4000]
- Login
- Add books [ http://localhost:4000/addBook]
- Edit books data [ http://localhost:4000/updateBookDetails]
- Get all the books [ http://localhost:4000/allBooks ]
- filter books [http://localhost:4000/filterBooksByAuthor?author=${query}]
- Delete Books [http://localhost:4000/deleteBook]

---

### Getting Started

1. Clone the repository to your local machine
  git clone <git@github.com:LalitAswal/Digital_Paani_BookManagement_API.git>
2. the required packages
  `npm install`
. Start the application `npm start`

### `npm start`

 `server`  `node`\
Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

Postman collection - https://github.com/LalitAswal/Digital_Paani_BookManagement_API/blob/qa/book%20managment.postman_collection.json
Documentation avaliable - https://github.com/LalitAswal/Digital_Paani_BookManagement_API/blob/qa/Documentation.md

### Built With

- Mongodb  v3.2
- Express.js v^4.19.2
- Node.js  v16.17.0

