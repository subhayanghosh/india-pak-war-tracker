import { WarStats, TimelineEvent } from '@/types';

// This would typically come from an API, but for now, we'll use mock data
export const warStatsService = {
  getCurrentStats(): WarStats {
    return {
      casualties: {
        military: {
          india: 150,
          pakistan: 180,
        },
        civilian: {
          india: 45,
          pakistan: 60,
        },
      },
      territory: {
        controlled: {
          india: 65,
          pakistan: 35,
        },
        disputed: 15,
      },
      militaryAssets: {
        india: {
          aircraft: 120,
          tanks: 250,
          artillery: 180,
          navalVessels: 15,
        },
        pakistan: {
          aircraft: 90,
          tanks: 180,
          artillery: 150,
          navalVessels: 8,
        },
      },
      economicImpact: {
        india: {
          gdpLoss: 2.5,
          infrastructureDamage: 1.8,
        },
        pakistan: {
          gdpLoss: 3.2,
          infrastructureDamage: 2.1,
        },
      },
      lastUpdated: new Date().toISOString(),
    };
  },

  getTimelineEvents(): TimelineEvent[] {
    return [
      {
        id: '1',
        date: '2024-03-15',
        title: 'Major Border Skirmish',
        description: 'Intense exchange of fire along the Line of Control',
        category: 'military',
        location: {
          lat: 34.0479,
          lng: 73.3587,
          name: 'Line of Control',
        },
        impact: {
          type: 'casualties',
          value: 12,
          side: 'both',
        },
      },
      {
        id: '2',
        date: '2024-03-10',
        title: 'Diplomatic Talks',
        description: 'Emergency meeting between foreign ministers',
        category: 'diplomatic',
        impact: {
          type: 'diplomatic',
          value: 0,
          side: 'both',
        },
      },
      // Add more timeline events as needed
    ];
  },
}; 