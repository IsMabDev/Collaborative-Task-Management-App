const prisma = require('../models/prismaClient')
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// router.get('/', async (req, res) => {
//   console.log("get ok");
//   res.send('Hello World!')
// })
router.get('/', userController.getAllUsers);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/createFakeUsers", userController.createFakeUsers);

router.get("/:id", userController.getUserbyId);

module.exports = router