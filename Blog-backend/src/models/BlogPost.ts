import { Schema, model, Document } from 'mongoose';

export interface BlogPost extends Document {
  title: string;
  content: string;
}

const blogPostSchema = new Schema<BlogPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default model<BlogPost>('BlogPost', blogPostSchema);