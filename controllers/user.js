const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userData = require("../schema/userSchema");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, age } = req?.body; 
    console.log(req?.body)
            if (!userName || !email || !password ||!age)
    {
        res.status(400)
        throw new Error("All fields userName, emailId ,password,age are required");
    }
    const userResponse = await userData.findOne({ email });
    if (userResponse && userResponse.email === email)
    {
        return res.status(400).json({ errorMessage: "User Already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userData.create({
        userName,
        email,
        password: hashedPassword,
        age
    });
    res.status(200).send({ message: "New User registered Successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password   } = req?.body;
    if (!email|| !password) {
        res.status(400)
        throw new Error("All fields emailId and password are required");
    };
    const userResponse = await userData.findOne({ email});
    if (userResponse && await bcrypt.compare(password,userResponse.password)) {
        
        res.status(200).json({ message: "Login sucessfull", userData:userResponse });
    }
    else {
        res.status(400)
        throw new Error("Incorrect email or password");
    }
});
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).send(req.user); 
});
const getAllUsers = asyncHandler(async (req, res) => {
    
    const usersResponse = await userData.find();
    if (usersResponse)
    {
        res.status(200).json({ data: usersResponse });
    }
    else
    {
        res.status(200).json({ message: "no data found" });
    }
})
const deleteUserById = asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const data = await userData.findOne({ userId: id });
    if (data)
    {
        await userData.deleteOne({ userId: id });
        res.status(200).json({ message: "user Deleted Sucessfully" });
    }
    else
    {
        res.status(200).json({ message: "no user found" });
        }

})
const searchUser=asyncHandler(async (req, res) => {
 
      const { query } = req?.query;
      if (!query) {
        return res.status(400).send({ message: "Query is required" });
      }

      const searchQuery = new RegExp(query, 'i');
      const users = await userData.find({
        $or: [
          { name: { $regex: searchQuery } },
          { email: { $regex: searchQuery } }
        ]
      });
  
    if (users)
    {
        res.status(200).json(users);
    }
    else {
        res.status(200).json({ message: "No user found" });
    }    
  });
module.exports = { registerUser, loginUser ,getAllUsers,deleteUserById,searchUser};
