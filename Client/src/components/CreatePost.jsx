import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const API_URL = "https://week7-assignment1.onrender.com";

const CreatePost = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page refresh

    const newPost = { user_id: 1, title, content };

    // Send new post to the server
    await fetch(`${API_URL}/add-post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    // Fetch updated posts after adding the new one
    const response = await fetch(`${API_URL}/posts`);
    const updatedPosts = await response.json();
    setPosts(updatedPosts);

    // Navigate back to home
    navigate("/");
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
