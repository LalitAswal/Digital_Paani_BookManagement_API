const express = require("express");
const router = express.Router();
const authentication = require("../middleware/jwt.js");

const { registrations, login } = require("../controller/user.controller");

const {
  addBook,
  updateBook,
  allBooks,
  filterBooksByAuthor,
  deleteBooksDetails
} = require("../controller/books.controller.js");

const {
  loginValidation,
  registrationsValidation,
  addBookValidation,
  updateBookValidator,
  filterBooksByAuthorValidation,
} = require("../Validators/books.validation.js");

router.post("/", registrationsValidation,registrations);
router.post("/login", loginValidation, login);
router.post("/addBook", authentication, addBookValidation, addBook);
router.patch(
  "/updateBookDetails",
  authentication,
  updateBookValidator,
  updateBook
);
router.get("/allBooks", authentication, allBooks);
router.get(
  "/filterBooksByAuthor",
  authentication,
  filterBooksByAuthorValidation,
  filterBooksByAuthor
);
router.delete(
  "/deleteBook",
  authentication,
  deleteBooksDetails
);

module.exports = router;
