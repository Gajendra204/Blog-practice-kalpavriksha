// import { BlogPost } from "../types";

// export const getBlogPosts = (): BlogPost[] => {
//     const posts = localStorage.getItem('blogPosts');
//     return posts ? JSON.parse(posts) : [];
// };

// export const saveBlogPost = (post: BlogPost): void => {
//     const posts = getBlogPosts();
//     posts.push(post);
//     localStorage.setItem('blogPosts', JSON.stringify(posts));
//   };
  
//   export const updateBlogPost = (id: string, updatedPost: BlogPost): void => {
//     const posts = getBlogPosts();
//     const updatedPosts = posts.map((post) =>
//       post.id === id ? updatedPost : post
//     );
//     localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
//   };
  
//   export const deleteBlogPost = (id: string): void => {
//     const posts = getBlogPosts();
//     const updatedPosts = posts.filter((post) => post.id !== id);
//     localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
//   };