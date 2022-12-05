const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  if (blogs === undefined) {
    return 0
  }

  return blogs.reduce((sum, blog) => blog.likes + sum, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
