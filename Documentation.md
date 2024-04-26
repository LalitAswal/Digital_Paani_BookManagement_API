# Book Management API Documentation

## POST /register

Register a new user.

### Request Body:

- `firstName` (string, required): The first name of the user.
- `lastName` (string, required): The last name of the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password of the user.

### Example Request:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response:

- **Code:** 200 OK
- **Content:**
```json
{
  "message": "Successfully Registered"
}
```

### Error Responses:

- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Empty Fields are not allowed" }`
- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Email account already exist" }`

## POST /login

Log in an existing user.

### Request Body:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password of the user.

### Example Request:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response:

- **Code:** 200 OK
- **Content:**
```json
{
  "message": "Successfully logged In",
  "token": "<token>"
}
```

### Error Responses:

- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Empty Fields are not allowed" }`
- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Invalid Email or Password" }`


## POST /addBook

Add a new book to the database.

### Request Body:

- `title` (string, required): The title of the book.
- `author` (string, required): The author of the book.
- `publicationYear` (number, required): The publication year of the book.

### Example Request:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publicationYear": 1925
}
```

### Success Response:

- **Code:** 201 CREATED
- **Content:**
```json
{
  "message": "Book added successfully"
}
```

### Error Responses:

- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Title, author, and publication year cannot be empty" }`
- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Book is already exist" }`

## POST /updateBook

Update an existing book in the database.

### Request Body:

- `_id` (string, required): The ID of the book to update.
- `title` (string, optional): The updated title of the book.
- `author` (string, optional): The updated author of the book.
- `publicationYear` (number, optional): The updated publication year of the book.

### Example Request:

```json
{
  "_id": "607d6e9f82b3b177af264c7b",
  "title": "New Title"
}
```

### Success Response:

- **Code:** 200 OK
- **Content:**
```json
{
  "message": "Successfully Updated",
  "response": {
    "_id": "607d6e9f82b3b177af264c7b",
    "title": "New Title",
    "author": "Example Author",
    "publicationYear": 2022
  }
}
```

### Error Responses:

- **Code:** 404 NOT FOUND
- **Content:** `{ "message": "title, author, publication year cant be empty" }`
- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Invalid Book" }`

## GET /allBooks

Get all the books from the database.

### Success Response:

- **Code:** 200 OK
- **Content:**
```json
{
  "response": [
    {
      "_id": "607d6e9f82b3b177af264c7b",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publicationYear": 1925
    },
    {
      "_id": "607d6f8b82b3b177af264c7c",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "publicationYear": 1960
    }
  ]
}
```

### Error Responses:

- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "No books added yet, please add some books" }`

## GET /filterBooksByAuthor

Filter books by author name.

### Query Parameters:

- `author` (string, required): The name of the author to filter by.

### Example Request:

```
/filterBooksByAuthor?author=Harper Lee
```

### Success Response:

- **Code:** 200 OK
- **Content:**
```json
{
  "response": [
    {
      "_id": "607d6f8b82b3b177af264c7c",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "publicationYear": 1960
    }
  ]
}
```

### Error Responses:

- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "Invalid author name" }`
- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "No author exist with this name" }`

## DELETE /deleteBooksDetails

Delete a book from the database.

### Request Body:

- `_id` (string, required): The ID of the book to delete.

### Example Request:

```json
{
  "_id": "607d6e9f82b3b177af264c7b"
}
```

### Success Response:

- **Code:** 200 OK
- **Content:**
```json
{
  "message": "Book successfully Deleted",
  "response": {
    "_id": "607d6e9f82b3b177af264c7b",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationYear": 1925,
    "isDeleted": true
  }
}
```

### Error Responses:

- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "try to delete, already deleted book" }`
- **Code:** 400 BAD REQUEST
- **Content:** `{ "message": "books doesn't exist" }`
