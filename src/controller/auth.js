const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { object, string, define, refine, assert, date } = require("superstruct");
dotenv.config();

const isDate = () => define("date", (value) => date(new Date(value)));
// const UserDetails = object({
//   name: string(),
//   email: string(),
//   dateOfBirth: isDate(),
//   password: string(),
// });

/**
 * @route POST v1/auth/createUser
 * @desc Registers a user
 * @access Public
 */
const createUser = async (req, res) => {
  try {
    let { name, email, password, dateOfBirth } = req.body;
    // assert(req.body, UserDetails, "User data is invalid");
    if (!name || !email || !password || !dateOfBirth) {
      return res.status(404).json({ message: "User details missing" });
    }
    const userPresent = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (userPresent) {
      return res.json({ message: "User already exists" });
    }

    let date = new Date(dateOfBirth);
    // console.log("date and type", date);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth: date,
      },
    });
    return res
      .status(200)
      .json({ message: "User Signed Up successfully", user });
  } catch (error) {
    console.log("error", error.message);
    // const { path, failures } = error;

    // const errorMessage = failures;
    // console.log("Validation failed:", path, errorMessage);
    return res.status(400).json({ Error: error.message });
  }
};

//signin user
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let jwtSecretKey = process.env.JWT_SECRET;
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    console.log("user is ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    console.log("userid", user.id);
    const token = jwt.sign({ userId: user.id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
