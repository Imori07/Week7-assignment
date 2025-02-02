import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// Root route
app.get("/", (_, res) => {
  res.json({ message: "Welcome to the API!" });
});

// Get all users
app.get("/users", async (_, res) => {
  const result = await db.query("SELECT * FROM users");
  res.json(result.rows);
});

// Add a new user
app.post("/add-user", async (req, res) => {
  const { username, email } = req.body;
  await db.query("INSERT INTO users (username, email) VALUES ($1, $2)", [
    username,
    email,
  ]);
  res.json({ message: "User added successfully!" });
});

// Get all posts
app.get("/posts", async (_, res) => {
  const result = await db.query("SELECT * FROM posts");
  res.json(result.rows);
});

// Add a new post (with some error handling)
app.post("/add-post", async (req, res) => {
  const { user_id, title, content } = req.body;
  try {
    await db.query(
      "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)",
      [user_id, title, content]
    );
    res.json({ message: "Post added successfully!" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Failed to add post" });
  }
});

// Delete a post by ID
app.delete("/delete-post/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM posts WHERE id = $1", [id]);
  res.json({ message: "Post deleted successfully!" });
});

// Get all comments
app.get("/comments", async (_, res) => {
  const result = await db.query("SELECT * FROM comments");
  res.json(result.rows);
});

// Add a comment
app.post("/add-comment", async (req, res) => {
  const { post_id, user_id, content } = req.body;
  await db.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)",
    [post_id, user_id, content]
  );
  res.json({ message: "Comment added successfully!" });
});

// Delete a comment by ID
app.delete("/delete-comment/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM comments WHERE id = $1", [id]);
  res.json({ message: "Comment deleted successfully!" });
});

//==============================================================
//What tasks can we perform with our server?

//Tasks --> CRUD
//create
//read
//update
//delete

//Each task has an HTTP method assigned to it
//post
//get
//put
//delete
//==============================================================
//This is an example of what the body object will look like
// body = {
//   biscuit_name: "Jaffa Cake",
//   src: "#",
//   description: "Is it a biscuit?",
//   crunchiness: 0,
// };
//==============================================================
//Params vs parameters
//Parameters --> placeholders in a function that we will replace with an argument later on
//Params --> a part of the url after the domain name
//==============================================================
