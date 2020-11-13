const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(function (blogWithMostLikes, blog) {

    if (blog.likes > blogWithMostLikes.likes) {
      return blog
    } else {
      return blogWithMostLikes
    }
  }, blogs[0]);
};

module.exports = { dummy, totalLikes, favoriteBlog };
