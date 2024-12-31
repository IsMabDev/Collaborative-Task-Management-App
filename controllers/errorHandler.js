// errorHandler.js

const Prisma = require("@prisma/client");

const errorHandler = (err, req, res, next) => {
   
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(400).json({ message: "Email already exists." });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: "verify your credentials" });
  }
 console.log('from error handler Internal server error \n '+ err );
  res.status(500).json({ message:  "Internal server error \n " + err });
 
};

module.exports = errorHandler;
