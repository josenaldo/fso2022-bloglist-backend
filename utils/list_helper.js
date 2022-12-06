const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  if (blogs === undefined) {
    return 0
  }

  return blogs.reduce((sum, blog) => blog.likes + sum, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return undefined
  }

  const blogToFavorite = (b) => ({
    title: b.title,
    author: b.author,
    likes: b.likes,
  })

  const firstFavorite = blogToFavorite(blogs[0])

  if (blogs.length === 1) {
    return firstFavorite
  }

  const favorite = blogs.reduce((previousFavorite, currentBlog) => {
    if (currentBlog.likes > previousFavorite.likes) {
      return blogToFavorite(currentBlog)
    }
    return previousFavorite
  }, firstFavorite)

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return undefined
  }

  const count = _.countBy(blogs, 'author')
  const pairs = _.toPairs(count)
  const authors = _.map(pairs, (p) => ({ author: p[0], blogs: p[1] }))
  const authorWithMostBlogs = _.maxBy(authors, (a) => a.blogs)

  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
