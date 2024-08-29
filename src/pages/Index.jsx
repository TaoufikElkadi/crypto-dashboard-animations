import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchCryptoData = async () => {
  // Simulated API call
  return [
    { name: 'Jan', btc: 4000, eth: 2400 },
    { name: 'Feb', btc: 3000, eth: 1398 },
    { name: 'Mar', btc: 2000, eth: 9800 },
    { name: 'Apr', btc: 2780, eth: 3908 },
    { name: 'May', btc: 1890, eth: 4800 },
    { name: 'Jun', btc: 2390, eth: 3800 },
  ];
};

const fetchNewsHeadlines = async () => {
  // Simulated API call
  return [
    { id: 1, title: "Major Bank Partners with Crypto Exchange", date: "2023-03-15" },
    { id: 2, title: "New Blockchain Alliance Formed by Tech Giants", date: "2023-03-14" },
    { id: 3, title: "Crypto Startup Secures $100M in Funding", date: "2023-03-13" },
  ];
};

const NewsCard = ({ title, date }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-4 rounded-lg shadow-md mb-4"
  >
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-500">{date}</p>
  </motion.div>
);

const Index = () => {
  const { data: cryptoData, isLoading: isLoadingCrypto } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
  });

  const { data: newsHeadlines, isLoading: isLoadingNews } = useQuery({
    queryKey: ['newsHeadlines'],
    queryFn: fetchNewsHeadlines,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Crypto Analytics Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Crypto Price Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingCrypto ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cryptoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="btc" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="eth" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Crypto News</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingNews ? (
              <div className="space-y-2">
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {newsHeadlines.map((headline) => (
                  <NewsCard key={headline.id} title={headline.title} date={headline.date} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">This chart shows the company's monthly revenue over the past year.</p>
            <iframe
              src="https://charts.mongodb.com/charts-project-0-qsuqx/embed/charts?id=65a5a8c4-5a8e-4a7a-8a1b-e2c9c9f5f5f5&maxDataAge=3600&theme=light&autoRefresh=true"
              className="w-full h-64 border-0"
            ></iframe>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">This chart displays the growth in customer base over time.</p>
            <iframe
              src="https://charts.mongodb.com/charts-project-0-qsuqx/embed/charts?id=65a5a8c4-5a8e-4a7a-8a1b-e2c9c9f5f5f6&maxDataAge=3600&theme=light&autoRefresh=true"
              className="w-full h-64 border-0"
            ></iframe>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">This pie chart illustrates the distribution of sales across different product categories.</p>
            <iframe
              src="https://charts.mongodb.com/charts-project-0-qsuqx/embed/charts?id=65a5a8c4-5a8e-4a7a-8a1b-e2c9c9f5f5f7&maxDataAge=3600&theme=light&autoRefresh=true"
              className="w-full h-64 border-0"
            ></iframe>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">This chart shows the breakdown of website traffic sources over the last month.</p>
            <iframe
              src="https://charts.mongodb.com/charts-project-0-qsuqx/embed/charts?id=65a5a8c4-5a8e-4a7a-8a1b-e2c9c9f5f5f8&maxDataAge=3600&theme=light&autoRefresh=true"
              className="w-full h-64 border-0"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
