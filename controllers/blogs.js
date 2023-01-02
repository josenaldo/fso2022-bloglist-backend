const blogsRouter = require('express').Router()

const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, author, likes } = request.body

  if (title === undefined || url === undefined) {
    return response.status(400).end()
  }

  const blogData = {
    title,
    url,
    author,
    likes: likes || 0,
  }

  const blog = new Blog(blogData)

  const result = await blog.save()
  logger.info('🟢', result)
  response.status(201).json(result)
})

module.exports = blogsRouter
