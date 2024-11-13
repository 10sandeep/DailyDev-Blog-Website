// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  readTime: string;
  likes: number;
  comments: number;
  content?: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: "Understanding React 18's Concurrent Features",
    description: "Deep dive into the new concurrent rendering capabilities in React 18 and how they improve user experience.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "React",
    readTime: "5 min",
    likes: 234,
    comments: 45,
    content: "Full article content here..."
  },
  {
    id: '2',
    title: "The Future of Web Development: What's Coming in 2024",
    description: "Exploring upcoming trends and technologies that will shape the future of web development.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Mike Rivers",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "Web Dev",
    readTime: "7 min",
    likes: 456,
    comments: 89,
    content: "Full article content here..."
  },
  {
    id: '3',
    title: "Building Scalable APIs with GraphQL",
    description: "Learn how to design and implement scalable GraphQL APIs for modern applications.",
    image: "https://images.unsplash.com/photo-1555066932-d69dac093642?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "GraphQL",
    readTime: "8 min",
    likes: 567,
    comments: 123,
    content: "Full article content here..."
  }
];

export const api = {
  async getArticles(category?: string) {
    await delay(800);
    return articles.filter(article => 
      !category || category === 'all' || article.category === category
    );
  },

  async getArticle(id: string) {
    await delay(500);
    return articles.find(article => article.id === id);
  },

  async updateArticleLikes(id: string, increment: boolean) {
    await delay(300);
    const article = articles.find(article => article.id === id);
    if (article) {
      article.likes += increment ? 1 : -1;
      return article.likes;
    }
    return 0;
  }
};