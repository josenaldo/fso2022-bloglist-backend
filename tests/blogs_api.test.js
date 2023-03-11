const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await helper.resetDB()
})

describe('GET /blogs', () => {
  it('should return all blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('should return all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  it('should return the blogs with the correct fields', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
      expect(blog.title).toBeDefined()
      expect(blog.author).toBeDefined()
      expect(blog.url).toBeDefined()
      expect(blog.likes).toBeDefined()
      expect(blog.user).toBeDefined()
      expect(blog.user.username).toBeDefined()
      expect(blog.user.name).toBeDefined()
    })
  })
})

describe('POST /blogs', () => {
  it('should create a valid blog and succeed with status 201', async () => {
    const newBlog = {
      title: 'Programação Orientada a Gambiarra',
      author: 'Josenaldo Matos',
      url: 'https://livropog.com.br',
      likes: 10,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const insertedBlog = response.body
    expect(insertedBlog.id).toBeDefined()
    expect(insertedBlog.title).toBe(newBlog.title)
    expect(insertedBlog.author).toBe(newBlog.author)
    expect(insertedBlog.url).toBe(newBlog.url)
    expect(insertedBlog.likes).toBe(newBlog.likes)
    expect(insertedBlog.user).toBeDefined()
    expect(insertedBlog.user.username).toBeDefined()
    expect(insertedBlog.user.name).toBeDefined()

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain(insertedBlog.title)
  })

  // eslint-disable-next-line no-multi-str
  it('should create a blog with the value of `like` property as zero if not \
  specified  and succeed with status 201', async () => {
    const newBlog = {
      title: 'Programação Orientada a Gambiarra',
      author: 'Josenaldo Matos',
      url: 'https://livropog.com.br',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const insertedBlog = response.body
    expect(insertedBlog.id).toBeDefined()
    expect(insertedBlog.title).toBe(newBlog.title)
    expect(insertedBlog.author).toBe(newBlog.author)
    expect(insertedBlog.url).toBe(newBlog.url)
    expect(insertedBlog.likes).toBe(0)
    expect(insertedBlog.user).toBeDefined()
    expect(insertedBlog.user.username).toBeDefined()
    expect(insertedBlog.user.name).toBeDefined()

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain(insertedBlog.title)
  })

  it('should not create a blog with an empty title and fail with status 400', async () => {
    const blogWithoutTitle = {
      author: 'Josenaldo Matos',
      url: 'https://livropog.com.br',
      likes: 10,
    }

    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
  })

  it('should not create a blog an empty url and fail with status 400 ', async () => {
    const blogWithoutUrl = {
      title: 'Programação Orientada a Gambiarra',
      author: 'Josenaldo Matos',
      likes: 10,
    }

    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
  })
})

describe('GET /blogs/:id', () => {
  it('should return a blog with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resultBlog = response.body

    const proccessedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog).toEqual(proccessedBlogToView)
    expect(resultBlog.user).toBeDefined()
    expect(resultBlog.user.username).toBeDefined()
    expect(resultBlog.user.name).toBeDefined()
  })

  it('should fail with status 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingBlogId()

    await api.get(`api/blogs/${validNonExistingId}`).expect(404)
  })

  test('should fail with status 400 if id is invalid', async () => {
    const invalidId = '22222'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('DELETE /blogs/:id', () => {
  test('should delete an existing blog and succeed with status 204', async () => {
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
    const nonExistingBlogId = await helper.nonExistingBlogId()

    await api.delete(`/api/blogs/${nonExistingBlogId}`).expect(204)
  })
})

describe('PUT /blogs/:id', () => {
  test('should update an existing blog successfully', async () => {
    const blogToUpdate = await helper.existingBlog()

    const updatedId = blogToUpdate.id

    blogToUpdate.title = 'Updated title'

    await api.put(`/api/blogs/${updatedId}`).send(blogToUpdate).expect(200)

    const updatedBlog = await Blog.findById(updatedId).populate('user')

    expect(updatedBlog).toMatchObject(blogToUpdate)
  })

  test('should update an existing blog successfully without an author', async () => {
    const blogToUpdate = await helper.existingBlog()

    const updatedId = blogToUpdate.id

    blogToUpdate.title = 'Updated title'
    delete blogToUpdate.author

    await api.put(`/api/blogs/${updatedId}`).send(blogToUpdate).expect(200)

    const updatedBlog = await Blog.findById(updatedId).populate('user')

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

  test('should fail with status 404 errorfor a non-existent blog', async () => {
    const nonExistingId = await helper.nonExistingBlogId()

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

  test('should fail with status 400 for update a blog without a title', async () => {
    const blogToUpdate = await helper.existingBlog()

    delete blogToUpdate.title
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400)
  })

  test('should fail with status 400 update a blog without an url', async () => {
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
