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

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'Programação Orientada a Gambiearra',
    author: 'Josenaldo Matos',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogs = blogsAtEnd.map((b) => ({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes,
  }))

  expect(blogs).toContainEqual(newBlog)
})

test('a inexistent like property must have value of zero', async () => {
  const newBlog = {
    title: 'Programação Orientada a Gambiearra',
    author: 'Josenaldo Matos',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const blogs = blogsAtEnd.map((b) => ({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes,
  }))

  const filteredBlogs = blogs.filter(
    (b) => b.title === 'Programação Orientada a Gambiearra'
  )
  expect(filteredBlogs).toHaveLength(1)

  const addedBlog = filteredBlogs[0]
  expect(addedBlog.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
