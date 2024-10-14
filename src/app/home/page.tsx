'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer
} from 'recharts';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function DashboardPage() {
  const viewsData = [
    { name: 'Jan', views: 1000 },
    { name: 'Feb', views: 2000 },
    { name: 'Mar', views: 3000 },
    { name: 'Apr', views: 2500 },
    { name: 'May', views: 4000 },
    { name: 'Jun', views: 5000 }
  ];

  const engagementData = [
    { name: 'Likes', value: 300 },
    { name: 'Comments', value: 50 },
    { name: 'Shares', value: 100 }
  ];

  const topPerformingVideos = [
    { name: 'Video 1', views: 5000 },
    { name: 'Video 2', views: 4500 },
    { name: 'Video 3', views: 4000 },
    { name: 'Video 4', views: 3500 },
    { name: 'Video 5', views: 3000 }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={200}
            >
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={200}
            >
              <PieChart>
                <Pie
                  data={engagementData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={200}
            >
              <BarChart data={topPerformingVideos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="views"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Shorts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>5 Money Habits of Millionaires</li>
              <li>Crypto Investing 101</li>
              <li>Stock Market Crash Coming?</li>
              <li>Passive Income Ideas for 2024</li>
              <li>Save $10K in 6 Months</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Total Shorts: 25</p>
              <p>Total Views: 1.2M</p>
              <p>Avg. View Duration: 45 seconds</p>
              <p>Subscriber Growth: +5000 this month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>How to Start Investing with $100</li>
              <li>5 Tax Saving Strategies for Entrepreneurs</li>
              <li>The Truth About Index Funds</li>
              <li>Maximizing Your 401(k) Returns</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
