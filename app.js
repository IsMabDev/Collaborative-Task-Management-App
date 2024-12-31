// app.js

const express = require("express");
const userRouter = require("./routes/userRoute");
const app = express();
const path = require("path");
const userController = require("./controllers/userController");
const passportConfig = require("./controllers/passportjsController")
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const errorHandler = require('./controllers/errorHandler');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
passportConfig(app);

app.get("/", (req, res) => res.render("index"));
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", userController.createUser);

const PORT = 3000;
app.use("/users", userRouter);
app.use( errorHandler); 

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
