import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import "./App.css";

const API_URL = "https://week7-assignment1.onrender.com";

const App = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts when the app loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-post">Create Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route
          path="/create-post"
          element={<CreatePost setPosts={setPosts} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
