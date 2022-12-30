const blogsRouter = require('express').Router()

const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    logger.info('🟢', result)
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
