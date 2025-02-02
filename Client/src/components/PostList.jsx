import "./PostList.css";

const PostList = ({ posts }) => {
  return (
    <div>
      <h1>All Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default PostList;
