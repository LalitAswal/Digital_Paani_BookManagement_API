const Joi = require("joi");

module.exports.loginValidation = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).options({ abortEarly: false });
  
    const { error } = loginSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next()
  };

module.exports.registrationsValidation = (req, res, next) => {
    const registrationsSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).options({ abortEarly: false });
  
    const { error } = registrationsSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next()
  };

module.exports.addBookValidation = (req, res, next) => {
  const addBooksSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publicationYear: Joi.number().required(),
  }).options({ abortEarly: false });

  const { error } = addBooksSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  next()
};

module.exports.updateBookValidator = (req, res, next) => {
  const updateBookSchema = Joi.object({
    _id:Joi.string().length(24).required(),
    title: Joi.string(),
    author: Joi.string(),
    publicationYear: Joi.number(),
  }).options({ abortEarly: false });

  const { error } = updateBookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.filterBooksByAuthorValidation = (req, res, next) => {
  const filterBooksByAuthorSchema = Joi.object({
    author: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = filterBooksByAuthorSchema.validate(req.query);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.myBattlesValidator = (req, res, next) => {
  const myBattlesSchema = Joi.object({
    Match_id: Joi.string().length(24).required(),
  }).options({ abortEarly: false });

  const { error } = myBattlesSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  next();
};


