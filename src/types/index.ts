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
    military: {
      india: number;
      pakistan: number;
    };
    civilian: {
      india: number;
      pakistan: number;
    };
  };
  territory: {
    controlled: {
      india: number; // percentage
      pakistan: number; // percentage
    };
    disputed: number; // percentage
  };
  militaryAssets: {
    india: {
      aircraft: number;
      tanks: number;
      artillery: number;
      navalVessels: number;
    };
    pakistan: {
      aircraft: number;
      tanks: number;
      artillery: number;
      navalVessels: number;
    };
  };
  economicImpact: {
    india: {
      gdpLoss: number; // in billions USD
      infrastructureDamage: number; // in billions USD
    };
    pakistan: {
      gdpLoss: number; // in billions USD
      infrastructureDamage: number; // in billions USD
    };
  };
  lastUpdated: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'military' | 'diplomatic' | 'economic' | 'humanitarian';
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  impact: {
    type: 'casualties' | 'territory' | 'economic' | 'military' | 'diplomatic';
    value: number;
    side: 'india' | 'pakistan' | 'both';
  };
} 