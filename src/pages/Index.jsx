import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from 'lucide-react';

const fetchIndustryNews = async () => {
  // Simulated API call
  return {
    partnerships: [
      { id: 1, title: "Binance Partners with Mastercard for Crypto Card Launch", link: "https://twitter.com/binance/status/1234567890" },
      { id: 2, title: "Coinbase and BlackRock Announce Strategic Partnership", link: "https://blog.coinbase.com/example-post" },
    ],
    vcRaises: [
      { id: 1, title: "Ethereum Layer 2 Solution Optimism Raises $150M in Series B Funding", link: "https://twitter.com/optimismFND/status/1234567891" },
      { id: 2, title: "DeFi Protocol Aave Secures $25M for Institutional Adoption", link: "https://medium.com/aave/example-post" },
    ],
  };
};

const fetchMarketMetrics = async () => {
  // Simulated API call
  return [
    {
      title: "Daily Active Addresses",
      description: "Number of unique addresses active in the network as a sender or receiver.",
      data: [
        { name: 'BTC', value: 1000000 },
        { name: 'ETH', value: 750000 },
        { name: 'SOL', value: 500000 },
      ],
    },
    {
      title: "Smart Contract Deployments",
      description: "Number of new smart contracts deployed on various chains in the last 24 hours.",
      data: [
        { name: 'ETH', value: 5000 },
        { name: 'BSC', value: 3500 },
        { name: 'AVAX', value: 2000 },
      ],
    },
  ];
};

const NewsCard = ({ title, link }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-4 rounded-lg shadow-md mb-4"
  >
    <h3 className="font-semibold text-lg text-blue-600 mb-2">{title}</h3>
    <Button variant="outline" size="sm" className="mt-2">
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
        Read More <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  </motion.div>
);

const MetricCard = ({ title, description, data }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <CardHeader>
      <CardTitle className="text-blue-600">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4 text-gray-600">{description}</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </motion.div>
);

const ProjectSpotlight = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <CardHeader>
      <CardTitle className="text-blue-600">Project Spotlight: {project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <p className="text-gray-600">{project.description}</p>
    </CardContent>
  </motion.div>
);

const Index = () => {
  const { data: industryNews, isLoading: isLoadingNews } = useQuery({
    queryKey: ['industryNews'],
    queryFn: fetchIndustryNews,
  });

  const { data: marketMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['marketMetrics'],
    queryFn: fetchMarketMetrics,
  });

  const projectSpotlight = {
    name: "Uniswap V3",
    image: "https://uniswap.org/images/twitter-card.jpg",
    description: "Uniswap V3 introduces concentrated liquidity, allowing liquidity providers to allocate capital more efficiently and potentially earn higher returns.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-blue-600"
      >
        Crypto Insights Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Brand Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingNews ? (
              <div className="space-y-2">
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
              </div>
            ) : (
              industryNews.partnerships.map((news) => (
                <NewsCard key={news.id} title={news.title} link={news.link} />
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">VC Raises & Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingNews ? (
              <div className="space-y-2">
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
              </div>
            ) : (
              industryNews.vcRaises.map((news) => (
                <NewsCard key={news.id} title={news.title} link={news.link} />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Market Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {isLoadingMetrics ? (
          <>
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </>
        ) : (
          marketMetrics.map((metric, index) => (
            <MetricCard key={index} title={metric.title} description={metric.description} data={metric.data} />
          ))
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Project Spotlight</h2>
      <ProjectSpotlight project={projectSpotlight} />
    </div>
  );
};

export default Index;
