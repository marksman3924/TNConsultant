export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  category?: string;
  cover?: string;
}

// Alias for compatibility
export type BlogPost = Post;