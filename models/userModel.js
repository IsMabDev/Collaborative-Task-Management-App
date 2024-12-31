const prisma = require('./prismaClient')

const createUser = async (name, email, password) => {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password
    }
  })

  return user
}

const getAllUsers = async () => {

  const users = await prisma.user.findMany()

  return users
}


const getUserbyId = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  return user
} 

const getUserbyEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  return user
}
const updateUser = async (id, name, email, password) => {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      name: name,
      email: email,
      password: password
    }
  })
  return user
}

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id: id
    }
  })
  return user
}

const createFakeUsers = async () => {
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Bob',
        email: 'a@b.com',
        password: '1234'
      },
      {
        name: 'John',
        email: 'b@c.com',
        password: '1234'
      },
      {
        name: 'Jane',
        email: 'c@d.com',
        password: '1234'
      }
    ]
  })  
  return users
}



module.exports = { createUser, getAllUsers, getUserbyId, updateUser, deleteUser, createFakeUsers, getUserbyEmail }

