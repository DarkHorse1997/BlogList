var _ = require('lodash');

const dummy = (blogs) => {
    return 1;
  }
  

const totalLikes = (blogs) => {
    const totalLikesReducer = (accumulator, initialValue) => accumulator + initialValue
    if(blogs.length === 0)
        return 0
    return blogs.map(blog => blog.likes).reduce(totalLikesReducer)

}

const favoriteBlog = (blogs) => {
    let max = 0;
    let maxBlog = null;
    blogs.forEach(blog => {
        if(blog.likes > max){
            max=blog.likes;
            maxBlog=blog;
        }
    })
    return maxBlog;
}

const mostBlogs = blogs => {
    if(blogs.length < 1) {
        return null;
    } 
    let result = 
        _.chain(blogs)
        .map('author')
        .flatten()
        .countBy()
        .entries()
        .maxBy(_.last)
        .value()              
   
    return {
        author: result[0],
        blogs: result[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return null;
    }
    
  
    const reducer = (acc, blog) => {
      return !acc[blog.author]
        ? { ...acc, [blog.author]: blog.likes }
        : { ...acc, [blog.author]: acc[blog.author] + blog.likes };
    };
  
    const likesTally = _.reduce(blogs, reducer, {});
  
    const authorWithMostLikes = _.chain(likesTally)
      .toPairs()
      .maxBy(_.last)
      .keyBy((value) => (typeof value === "number" ? "likes" : "author"))
      .value();
  
    return authorWithMostLikes;
  };




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes

  }