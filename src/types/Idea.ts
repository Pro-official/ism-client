export interface Idea {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
}
