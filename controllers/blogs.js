const blogsRouter = require('express').Router()

const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  logger.info('🟢', result)
  response.status(201).json(result)
})

module.exports = blogsRouter
