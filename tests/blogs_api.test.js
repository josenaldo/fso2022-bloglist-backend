const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blogs_test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 10000)

describe('when viewing blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('blogs must have an id property', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    expect(blogs).toHaveLength(6)

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('when viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const proccessedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(proccessedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api.get(`api/blogs/${validNonExistingId}`).expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('when adding a blog', () => {
  test('a valid blog post can be added', async () => {
    const newBlog = {
      title: 'Programação Orientada a Gambiarra',
      author: 'Josenaldo Matos',
      url: 'https://livropog.com.br',
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
      title: 'Programação Orientada a Gambiarra',
      author: 'Josenaldo Matos',
      url: 'https://livropog.com.br',
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
      (b) => b.title === 'Programação Orientada a Gambiarra'
    )
    expect(filteredBlogs).toHaveLength(1)

    const addedBlog = filteredBlogs[0]
    expect(addedBlog.likes).toBe(0)
  })

  test('trying add a invalid blog must return bad request', async () => {
    const blogWithoutTitle = {
      author: 'Josenaldo Matos',
      url: 'https://livropog.com.br',
      likes: 10,
    }

    const blogWithoutUrl = {
      title: 'Programação Orientada a Gambiarra',
      author: 'Josenaldo Matos',
      likes: 10,
    }

    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
  })
})

describe('when removing a blog', () => {
  test('existent blog must succeed with status 204 ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((b) => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('invalid id must fails with status 400', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })

  test('non existent blog must succeed with status 204', async () => {
    const nonExistentId = await helper.nonExistingId()

    await api.delete(`/api/blogs/${nonExistentId}`).expect(204)
  })
})

describe('when editing a blog', () => {})

afterAll(() => {
  mongoose.connection.close()
})
