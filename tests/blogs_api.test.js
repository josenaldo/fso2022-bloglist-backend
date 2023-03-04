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
  test('should return blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should require an id property for each blog', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    expect(blogs).toHaveLength(6)

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('when viewing a specific blog', () => {
  test('should succeed with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const proccessedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(proccessedBlogToView)
  })

  test('should fail with status 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api.get(`api/blogs/${validNonExistingId}`).expect(404)
  })

  test('should fail with status 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('when adding a blog', () => {
  test('should add a valid blog post successfully', async () => {
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

  test('should set the value of a non-existent like property to zero', async () => {
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

  test('should return a bad request status when trying to add an invalid blog', async () => {
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
  test('should succeed with status 204 for an existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((b) => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('should fail with status 400 for an invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })

  test('should succeed with status 204 for a non-existent blog', async () => {
    const nonExistentId = await helper.nonExistingId()

    await api.delete(`/api/blogs/${nonExistentId}`).expect(204)
  })
})

describe('when editing a blog', () => {
  test('should update an existing blog successfully', async () => {
    const blogToUpdate = await helper.existingBlog()

    const updatedId = blogToUpdate.id

    blogToUpdate.title = 'Updated title'

    await api.put(`/api/blogs/${updatedId}`).send(blogToUpdate).expect(200)

    const updatedBlog = await Blog.findById(updatedId)

    expect(updatedBlog).toMatchObject(blogToUpdate)
  })

  test('should update an existing blog successfully without an author', async () => {
    const blogToUpdate = await helper.existingBlog()

    const updatedId = blogToUpdate.id

    blogToUpdate.title = 'Updated title'
    delete blogToUpdate.author

    await api.put(`/api/blogs/${updatedId}`).send(blogToUpdate).expect(200)

    const updatedBlog = await Blog.findById(updatedId)

    expect(updatedBlog).toMatchObject(blogToUpdate)
  })

  test('should update an existing blog successfully without likes', async () => {
    const blogToUpdate = await helper.existingBlog()

    const updatedId = blogToUpdate.id

    blogToUpdate.title = 'Updated title'
    delete blogToUpdate.likes

    await api.put(`/api/blogs/${updatedId}`).send(blogToUpdate).expect(200)

    const updatedBlog = await Blog.findById(updatedId)

    expect(updatedBlog.likes).toBe(0)
  })

  test('should return a 404 error when trying to update a non-existent blog', async () => {
    const nonExistingId = await helper.nonExistingId()

    const blogToUpdate = await helper.existingBlog()

    blogToUpdate.id = nonExistingId
    blogToUpdate.title = 'Updated title'

    await api.put(`/api/blogs/${nonExistingId}`).send(blogToUpdate).expect(404)
  })

  test('should fail with status 400 for an invalid id', async () => {
    const invalidId = 'l33tC0d3'
    const blogToUpdate = await helper.existingBlog()

    await api.put(`/api/blogs/${invalidId}`).send(blogToUpdate).expect(400)
  })

  test('should fail with astatus 400 when trying to update a blog without a title', async () => {
    const blogToUpdate = await helper.existingBlog()

    delete blogToUpdate.title
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400)
  })

  test('should fail with astatus 400 when trying to update a blog without a url', async () => {
    const blogToUpdate = await helper.existingBlog()

    delete blogToUpdate.url
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
