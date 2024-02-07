import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Make sure you have the CSS for styling

function CreatePost({ onNewPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/posts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });
      onNewPost(response.data); // Update the post list in the parent component
      // Reset the form fields
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="create-post-input"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="create-post-textarea"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" className="create-post-button">Add Post</button>
    </form>
  );
}

export default CreatePost;
