const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Validate user input
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "Email already in use!" });

    // Hash the password
    const saltRounds = Number(process.env.SALT) || 10; // Use 10 as a default value if SALT is not set
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();

    // Send a response
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error occurred in POST /users:", error); // Log the full error
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
