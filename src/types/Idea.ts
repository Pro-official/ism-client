export interface Idea {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  banner: string;
  votes: number;
  voters: string[];
  status: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
