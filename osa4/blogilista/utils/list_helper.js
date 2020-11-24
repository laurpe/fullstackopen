
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((blogWithMostLikes, blog) => {
    if (blog.likes > blogWithMostLikes.likes) {
      return blog
    } else {
      return blogWithMostLikes
    }
  }, blogs[0]);
};

const mostBlogs = (blogs) => {

  const authors = blogs.map(blog => blog.author)

  const authorBlogCount = authors.reduce((accumulator, current) => {
    if (accumulator.filter(obj => obj.author === current).length > 0) {
      const indexOfObject = accumulator.findIndex(obj => obj.author === current)
      accumulator[indexOfObject].blogs += 1

      return accumulator
    }

    accumulator.push({ author: current, blogs: 1 })
    return accumulator
  }, [])

  authorBlogCount.sort((a, b) => b.blogs - a.blogs)

  return authorBlogCount[0]
}

const mostLikes = (blogs) => {
  const authorsAndLikes = blogs.map((blog) => {
    return { author: blog.author, likes: blog.likes }
  })

  const authorWithCountedLikes = authorsAndLikes.reduce((accumulator, current) => {
    if (accumulator.filter(obj => obj.author === current.author).length > 0) {
      const indexOfObject = accumulator.findIndex(obj => obj.author === current.author)
      accumulator[indexOfObject].likes += current.likes

      return accumulator
    }
    accumulator.push(current)

    return accumulator
  }, [])

  authorWithCountedLikes.sort((a, b) => b.likes - a.likes)

  return authorWithCountedLikes[0]
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
