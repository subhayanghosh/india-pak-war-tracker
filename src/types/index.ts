export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'military' | 'diplomatic' | 'economic' | 'humanitarian';
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: string;
  reliability: number; // 0-1 scale
}

export interface WarStats {
  casualties: {
    military: number;
    civilian: number;
  };
  territory: {
    controlled: number; // percentage
    disputed: number; // percentage
  };
  lastUpdated: string;
} 