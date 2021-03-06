import React, { useState } from 'react'
import blogs from '../services/blogs';
import PropTypes from 'prop-types';
const Blog = ({ blog, user }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const handleLikes = blog => {
        blogs.updateBlog({
            user:blog.user.id,
            likes:blog.likes + 1,
            author:blog.author,
            title:blog.title,
            url:blog.url
        },blog.id);
    };

    const deleteBlog = blog => {
        const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if(result){
            blogs.deleteBlog(blog.id);
        }
    };

    const details = () => (
        <div>
            <h2>{blog.title}<button onClick={() => setDetailsVisible(!detailsVisible)}>hide</button></h2>
            <a href={blog.url}>{blog.url}</a>
            <p>likes {blog.likes}<button onClick={() => handleLikes(blog)}>like</button></p>
            <p>{blog.author}</p>
            {
                blog.user.username === user.username &&
              <button onClick={() => deleteBlog(blog)}>remove</button>
            }
        </div>
    );


    return (
        <div>
            {
                detailsVisible
                    ? details()
                    : <>
                        {blog.title} &nbsp;
                        {blog.author}
                        <button onClick={()=> setDetailsVisible(!detailsVisible)}>view</button>
                    </>
            }

        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Blog;
