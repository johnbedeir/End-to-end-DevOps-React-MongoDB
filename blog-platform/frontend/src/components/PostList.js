import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost'; // Import the CreatePost component

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  const handleNewPost = (newPost) => {
    setPosts(previousPosts => [newPost, ...previousPosts]); // Add the new post to the start of the list
    axios.get('/api/posts');
  };

  return (
    <div>
      <CreatePost onNewPost={handleNewPost} />
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          {post.image && (
            <img 
              src={post.image}
              alt={post.title} 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          )}
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
