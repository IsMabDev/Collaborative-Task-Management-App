//userController.js
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.testController = (req, res) => {
  res.send("hello world");
};  

exports.getAllUsers = async (req, res) => {

  const users = await userModel.getAllUsers();

  res.json(users);  

}

exports.createUser = asyncHandler(async (req, res) => {
    const user = await userModel.createUser(req.body.name, req.body.email, req.body.password);
    
    res.status(201).json(user);
 

  
}); 

exports.deleteUser = async (req, res) => {
  const user = await userModel.deleteUser(req.params.id);
  res.json(user);
};

exports.getUserbyId = async (req, res) => {
  if (req.params.id) {
    const user = await userModel.getUserbyId(req.params.id);
    res.json(user);
  }
};

exports.updateUser = async (req, res) => {
  const user = await userModel.updateUser(req.params.id, req.body.name, req.body.email, req.body.password);
  res.json(user);
};



exports.createFakeUsers = async (req, res) => {
  const users = await userModel.createFakeUsers();
  res.json(users);
};

