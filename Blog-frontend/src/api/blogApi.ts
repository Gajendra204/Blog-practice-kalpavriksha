import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogs';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all blog posts
export const fetchBlogPosts = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

// Create a new blog post
export const createBlogPost = async (post: { title: string; content: string }) => {
  const response = await axios.post(API_URL, post, getAuthHeaders());
  return response.data;
};

// Update an existing blog post
export const updateBlogPost = async (id: string, post: { title: string; content: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, post, getAuthHeaders());
  return response.data;
};

// Delete a blog post
export const deleteBlogPost = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
