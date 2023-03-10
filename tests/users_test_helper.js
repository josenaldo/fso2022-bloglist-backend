const bcrypt = require('bcrypt')

const User = require('../models/user')

const initialUsers = [
  {
    name: 'Root',
    username: 'root',
    password: 'sekret',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const resetUsers = async () => {
  await User.deleteMany({})

  const user = initialUsers[0]

  const passwordHash = await bcrypt.hash(user.password, 10)

  const newUser = new User({
    name: user.name,
    username: user.username,
    passwordHash,
  })

  await newUser.save()
}

module.exports = {
  initialUsers,
  usersInDb,
  resetUsers,
}
