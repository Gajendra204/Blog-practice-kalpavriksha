import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';


//To get Posts
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blog posts', error: err });
  }
};

//To create posts
export const createBlogPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const newPost = new BlogPost({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog post', error: err });
  }
};

//To update posts
export const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { title, content } = req.body;
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } 
    ); 
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog post', error: err });
  }
};

//To delete posts
export const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await BlogPost.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog post', error: err });
  }
};