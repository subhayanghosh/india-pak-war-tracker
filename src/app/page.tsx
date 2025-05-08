'use client';

import { useEffect, useState } from 'react';
import { WarStats, TimelineEvent } from '@/types';
import { warStatsService } from '@/services/warStatsService';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, ArcElement);

export default function Home() {
  const [stats, setStats] = useState<WarStats | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const fetchData = () => {
      setStats(warStatsService.getCurrentStats());
      setTimeline(warStatsService.getTimelineEvents());
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Chart Data
  const casualtiesBarData = {
    labels: ['Military', 'Civilian'],
    datasets: [
      {
        label: 'India',
        data: [stats.casualties.military.india, stats.casualties.civilian.india],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
      {
        label: 'Pakistan',
        data: [stats.casualties.military.pakistan, stats.casualties.civilian.pakistan],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  const territoryDoughnutData = {
    labels: ['India', 'Pakistan', 'Disputed'],
    datasets: [
      {
        data: [stats.territory.controlled.india, stats.territory.controlled.pakistan, stats.territory.disputed],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const militaryAssetsBarData = {
    labels: ['Aircraft', 'Tanks', 'Artillery', 'Naval Vessels'],
    datasets: [
      {
        label: 'India',
        data: [
          stats.militaryAssets.india.aircraft,
          stats.militaryAssets.india.tanks,
          stats.militaryAssets.india.artillery,
          stats.militaryAssets.india.navalVessels,
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
      {
        label: 'Pakistan',
        data: [
          stats.militaryAssets.pakistan.aircraft,
          stats.militaryAssets.pakistan.tanks,
          stats.militaryAssets.pakistan.artillery,
          stats.militaryAssets.pakistan.navalVessels,
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  const economicBarData = {
    labels: ['GDP Loss (B USD)', 'Infrastructure Damage (B USD)'],
    datasets: [
      {
        label: 'India',
        data: [stats.economicImpact.india.gdpLoss, stats.economicImpact.india.infrastructureDamage],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
      {
        label: 'Pakistan',
        data: [stats.economicImpact.pakistan.gdpLoss, stats.economicImpact.pakistan.infrastructureDamage],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          India-Pakistan Conflict Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Casualties</h2>
            <Bar data={casualtiesBarData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Territory Control</h2>
            <Doughnut data={territoryDoughnutData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Military Assets Comparison</h2>
            <Bar data={militaryAssetsBarData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Economic Impact (Billions USD)</h2>
            <Bar data={economicBarData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Timeline Events</h2>
            <div className="mt-6 space-y-4">
              {timeline.map((event) => (
                <div
                  key={event.id}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-right">
          Last updated: {format(new Date(stats.lastUpdated), 'MMM d, yyyy h:mm a')}
        </div>
      </div>
    </main>
  );
}
