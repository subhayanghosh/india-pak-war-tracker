import axios from 'axios';
import { NewsItem } from '@/types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

interface NewsApiArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export const newsService = {
  async getLatestNews(): Promise<NewsItem[]> {
    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        params: {
          q: '(India AND Pakistan) AND (war OR conflict OR military)',
          language: 'en',
          sortBy: 'publishedAt',
          apiKey: NEWS_API_KEY,
        },
      });

      return response.data.articles.map((article: NewsApiArticle) => ({
        id: article.url,
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
        category: this.categorizeNews(article.title, article.description),
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  },

  categorizeNews(title: string, description: string): NewsItem['category'] {
    const text = `${title} ${description}`.toLowerCase();
    
    if (text.includes('military') || text.includes('attack') || text.includes('defense')) {
      return 'military';
    }
    if (text.includes('diplomat') || text.includes('talks') || text.includes('negotiation')) {
      return 'diplomatic';
    }
    if (text.includes('economy') || text.includes('trade') || text.includes('sanction')) {
      return 'economic';
    }
    return 'humanitarian';
  },
}; 