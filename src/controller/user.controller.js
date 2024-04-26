const UserModels = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registrations = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: `Empty Fields are nnpot allowed` });
    }
    const checkAlreadyExist = await UserModels.findOne({email:email}).lean();
    if(checkAlreadyExist){
      return res
        .status(400)
        .json({ message: `Email account already exist` });
    }
    const hashedPassword = await bcrypt.hash(password.toString(), 10); // Using 10 salt rounds
    await UserModels.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: `Successfully Registered` });
  } catch (error) {
    return res.status(500).json({ message: `Error while creating account` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: `Empty Fields are not allowed` });
    }
    let result = await UserModels.findOne({ email: email });

    if (!result) {
      return res.status(400).json({ message: `Invalid Email or Password` });
    }
    let passwordCheck = bcrypt.compare(password.toString(), result.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: `Invalid Email or Password` });
    }

    const expireTime = process.env.jwtExpiryTime;
    const privateKey = process.env.jwtPrivateKey;
    const token = jwt.sign({ email }, privateKey, { expiresIn: expireTime });
    return res
      .status(200)
      .json({ message: `Successfully logged In`, token: token });
  } catch (error) {
    return res.status(500).json({ message: `Error updating`, error: error });
  }
};

const userDetails = async (req, res) => {
  try {
    const email = req.email;
    if (!email) {
      return res.status(404).json({ message: `Invalid email` });
    }
    const UserAggregate = [
      { $match: { email: email } },
      {
        $project: {
          _id: 0,
          password: 0,
          __v: 0,
        },
      },
    ];
    let data = await UserModels.aggregate(UserAggregate);
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(500).json({ message: `invalid response` });
  }
};

module.exports = { registrations, login, userDetails };
