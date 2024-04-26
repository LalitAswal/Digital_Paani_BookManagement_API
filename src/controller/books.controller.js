const booksModel = require("../models/books.model");
const UserModels = require("../models/user.model");

const addBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;

    if (!title || !author || !publicationYear) {
      return res
        .status(400)
        .json({
          message: "Title, author, and publication year cannot be empty",
        });
    }

    const checkAlreadyExist = await booksModel.find({title:title}).lean();

    if (checkAlreadyExist.length !== 0) {
      if (checkAlreadyExist[0].isDeleted === true) {
        await booksModel.updateOne(
          { _id: checkAlreadyExist[0]._id },
          { isDeleted: false }
        ).exec();
        
        return res.status(200).json({
          message: "Book is already exist but marked as deleted. It has been restored."
        });
      }
      
      return res.status(400).json({
        message: "Book is already exist",
      });
    }
    
    const newBook = new booksModel({
      title: title,
      author: author,
      publicationYear: publicationYear,
    });

    await newBook.save();

    return res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({ message: "Error adding book", error: error });
  }
};

const updateBook = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    if ((_id, !Object.keys(updateData).length === 0)) {
      return res
        .status(404)
        .json({ message: `title, author, publication year cant be empty` });
    }

    const bookExist = await booksModel.findById(_id);

    if (!bookExist) {
      return res.status(400).json({ message: "Invalid Book" });
    }

    if (
      bookExist.title === updateData.title &&
      bookExist.author === updateData.author &&
      bookExist.publicationYear === updateData.publicationYear
    ) {
      return res.status(400).json({ message: "Sending Same Data" });
    }
    const updateObject = {};
    for (const key in updateData) {
      updateObject[key] = updateData[key];
    }

    const updateResult = await booksModel.findOneAndUpdate(
      { _id: _id },
      updateObject,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: `Successfully Updated`, response: updateResult });
  } catch (error) {
    return res.status(500).json({ message: `Error updating`, error: error });
  }
};

const allBooks = async (req, res) => {
  try {
    const allBookResult = await booksModel.find({isDeleted:false}).lean();

    if (!allBookResult) {
      return res
        .status(400)
        .json({ message: "No books added yet, please add some books" });
    }

    return res.status(200).json({ response: allBookResult });
  } catch (error) {
    return res.status(500).json({ message: `Error updating`, error: error });
  }
};

const filterBooksByAuthor =async(req, res) =>{
    try {
        const {  author } = req.query;

    if(!author){
        return res
        .status(400)
        .json({ message: "Invalid author name" });
    }

    const result = await booksModel.find({author, isDeleted:false}).lean();

    if(result.length ===0){
      return res
        .status(400)
        .json({ message: "No author exist with this name" });
    }

    return res.status(200).json({ response: result });
        
    } catch (error) {
        return res.status(500).json({ message: `Error updating`, error: error });
    }
    
    
}

const deleteBooksDetails = async(req, res) =>{
  try {
    const {_id} =req.body;
    
    const findBooks = await booksModel.findById({_id:_id}).lean();
    if(findBooks.isDeleted === true){
      return res
        .status(400)
        .json({ message: "try to delete, already deleted book" });
    }
    if(!findBooks){
      return res
        .status(400)
        .json({ message: "books doesn't exist" });
    }

    const deleteBook = await booksModel.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true }
    );
    
    return res.status(200).json({ message: 'book successfully Deleted',response: deleteBook });


  } catch (error) {
    return res.status(500).json({ message: `Error updating`, error: error });
    
  }
}

  

module.exports = { addBook, updateBook, allBooks, filterBooksByAuthor, deleteBooksDetails };
