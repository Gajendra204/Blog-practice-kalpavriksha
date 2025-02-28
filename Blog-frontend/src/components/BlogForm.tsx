import React, { useState } from "react";
import { createBlogPost, updateBlogPost } from "../api/blogApi";
import "./BlogStyles.css";

interface BlogFormProps {
  post?: any;
  onUpdate?: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, onUpdate }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const handleSubmit = async () => {
    const newPost = { title, content };
    if (post) {
      await updateBlogPost(post._id, newPost);
    } else {
      await createBlogPost(newPost);
    }
    setTitle("");
    setContent("");
    if (onUpdate) onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{post ? "Update" : "Create"} Post</button>
    </form>
  );
};

export default BlogForm;
