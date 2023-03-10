const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./users_test_helper')
const app = require('../app')

const api = supertest(app)

describe('when creating a user', () => {
  beforeEach(async () => {
    await helper.resetUsers()
  })

  test('a valid user can be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'New User',
      username: 'newuser',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a user with an empty username cannot be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'New User',
      username: '',
      password: 'password',
    }

    const respose = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).not.toContain(newUser.username)

    expect(respose.body.error).toContain('`username` is required')
  })

  test('a user with an invalid username cannot be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'New User',
      username: 'ne',
      password: 'password',
    }

    const respose = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).not.toContain(newUser.username)

    expect(respose.body.error).toContain(
      '`username` must be at least 3 characters'
    )
  })

  test('a user with an empty password cannot be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'New User',
      username: 'newuser',
      password: '',
    }

    const respose = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).not.toContain(newUser.username)

    expect(respose.body.error).toContain('`password` is required')
  })

  test('a user with an invalid password cannot be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'New User',
      username: 'newuser',
      password: '12',
    }

    const respose = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).not.toContain(newUser.username)

    expect(respose.body.error).toContain(
      '`password` must be at least 3 characters'
    )
  })

  test('a user with a duplicate username cannot be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'root',
      username: 'root',
      password: 'root',
    }

    const respose = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(respose.body.error).toContain('`username` must to be unique')
  })
})

describe('when viewing all users', () => {
  beforeEach(async () => {
    await helper.resetUsers()
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('the returned users have the correct fields', async () => {
    const response = await api.get('/api/users')

    const users = response.body

    expect(users).toBeDefined()

    users.forEach((user) => {
      expect(user.id).toBeDefined()
      expect(user.name).toBeDefined()
      expect(user.username).toBeDefined()
      expect(user.passwordHash).not.toBeDefined()
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
