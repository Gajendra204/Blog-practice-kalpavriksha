import React, { useState, useEffect } from 'react';
import { fetchBlogPosts, deleteBlogPost } from '../api/blogApi';
import BlogForm from './BlogForm';
import './BlogStyles.css'

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetchBlogPosts();
      setPosts(posts);
    };
    getPosts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteBlogPost(id);
    const updatedPosts = await fetchBlogPosts();
    setPosts(updatedPosts);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
  };

  const handleUpdate = async () => {
    setEditingPost(null);
    const updatedPosts = await fetchBlogPosts();
    setPosts(updatedPosts);
  };

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post._id} className="blog-post">
          <h2> {post.title}</h2>
          <p> {post.content}</p>
          <div className="actions">
            <button className="edit" onClick={() => handleEdit(post)}>
              Edit
            </button>
            <button className="delete" onClick={() => handleDelete(post._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      {editingPost && (
        <BlogForm post={editingPost} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default BlogList;