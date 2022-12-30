const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const helper = require('./blogs_test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const initialBlogs = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = initialBlogs.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs must have an id property', async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body

  expect(blogs).toHaveLength(6)

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
