'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function VideosPage() {
  const dummyVideos = [
    {
      id: 1,
      title: '5 Money Habits of Millionaires',
      description: 'Secrets to building wealth like the rich',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube'],
      views: '1.2M'
    },
    {
      id: 2,
      title: 'Crypto Investing 101',
      description: 'Beginner guide to cryptocurrency',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['TikTok', 'Instagram'],
      views: '890K'
    },
    {
      id: 3,
      title: 'Stock Market Crash Coming?',
      description: 'Warning signs to watch out for',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube', 'Instagram'],
      views: '2.1M'
    },
    {
      id: 4,
      title: 'Passive Income Ideas for 2024',
      description: 'Make money while you sleep',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['Instagram'],
      views: '1.5M'
    },
    {
      id: 5,
      title: 'Save $10K in 6 Months',
      description: 'Practical tips to boost your savings',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube', 'TikTok'],
      views: '750K'
    },
    {
      id: 6,
      title: 'Real Estate Investing for Beginners',
      description: 'Start building your property portfolio',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['Instagram'],
      views: '980K'
    },
    {
      id: 7,
      title: 'Retire by 40: FIRE Movement Explained',
      description: 'Financial Independence, Retire Early',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube'],
      views: '1.8M'
    },
    {
      id: 8,
      title: 'Side Hustles That Pay $1000/Week',
      description: 'Boost your income with these gigs',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube'],
      views: '2.3M'
    },
    {
      id: 9,
      title: 'Credit Score Hacks',
      description: 'Boost your score by 100 points fast',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube', 'Instagram'],
      views: '1.1M'
    },
    {
      id: 10,
      title: "Warren Buffett's Investment Strategy",
      description: 'Learn from the Oracle of Omaha',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube'],
      views: '3.2M'
    },
    {
      id: 11,
      title: 'NFTs Explained in 60 Seconds',
      description: 'Understanding the digital asset craze',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['Instagram'],
      views: '670K'
    },
    {
      id: 12,
      title: 'Debt-Free in 12 Months',
      description: 'Step-by-step guide to financial freedom',
      thumbnail: 'https://placehold.co/300x200.png',
      platforms: ['YouTube', 'TikTok'],
      views: '1.7M'
    }
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyVideos.map(video => (
          <Card
            key={video.id}
            className="flex flex-col h-full"
          >
            <CardHeader>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {video.platforms.map(platform => (
                    <Badge
                      key={platform}
                      className={`text-white ${
                        platform === 'YouTube'
                          ? 'bg-red-600'
                          : platform === 'TikTok'
                          ? 'bg-black'
                          : platform === 'Instagram'
                          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-gray-500">{video.views} views</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
