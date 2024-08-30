import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ExternalLink } from 'lucide-react';

const fetchIndustryNews = async () => {
  // Simulated API call
  return {
    partnerships: [
      { id: 1, title: "Binance Partners with Mastercard", description: "Binance and Mastercard launch a new crypto card, expanding cryptocurrency usage in everyday transactions.", shortDescription: "New crypto card expands everyday crypto usage.", link: "https://twitter.com/binance/status/1234567890" },
      { id: 2, title: "Coinbase and BlackRock Partnership", description: "Coinbase teams up with BlackRock to provide institutional clients with crypto trading and custody services.", shortDescription: "Institutional crypto services expanded through partnership.", link: "https://blog.coinbase.com/example-post" },
    ],
    vcRaises: [
      { id: 1, title: "Optimism Raises $150M in Series B", description: "Ethereum Layer 2 solution Optimism secures $150M in Series B funding to scale its infrastructure.", shortDescription: "Layer 2 solution secures major funding for scaling.", link: "https://twitter.com/optimismFND/status/1234567891" },
      { id: 2, title: "Aave Secures $25M for Institutional Adoption", description: "DeFi protocol Aave raises $25M to accelerate institutional adoption of decentralized finance.", shortDescription: "DeFi protocol raises funds to boost institutional adoption.", link: "https://medium.com/aave/example-post" },
    ],
  };
};

const NewsCard = ({ title, description, shortDescription, link }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200"
  >
    <h3 className="font-bold text-xl text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-2 text-sm">{shortDescription}</p>
    <p className="text-gray-700 mb-4 text-sm">{description}</p>
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
    >
      Read more <ArrowRight className="ml-1 h-4 w-4" />
    </a>
  </motion.div>
);

const ImageCard = ({ title, imageSrc, link }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <CardHeader>
      <CardTitle className="text-black">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={imageSrc} alt={title} className="w-full h-auto object-cover rounded-md" />
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        View full chart <ExternalLink className="ml-1 h-4 w-4" />
      </a>
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
      <CardTitle className="text-black">Project Spotlight: {project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <p className="text-black">{project.description}</p>
    </CardContent>
  </motion.div>
);

const Index = () => {
  const { data: industryNews, isLoading: isLoadingNews } = useQuery({
    queryKey: ['industryNews'],
    queryFn: fetchIndustryNews,
  });

  const projectSpotlight = {
    name: "Uniswap V3",
    image: "https://uniswap.org/images/twitter-card.jpg",
    description: "Uniswap V3 introduces concentrated liquidity, allowing liquidity providers to allocate capital more efficiently and potentially earn higher returns.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-black"
      >
        Crypto Insights Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-black">Brand Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingNews ? (
              <div className="space-y-2">
                <Skeleton className="h-[120px] w-full" />
                <Skeleton className="h-[120px] w-full" />
              </div>
            ) : (
              industryNews.partnerships.map((news) => (
                <NewsCard key={news.id} title={news.title} description={news.description} shortDescription={news.shortDescription} link={news.link} />
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-black">VC Raises & Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingNews ? (
              <div className="space-y-2">
                <Skeleton className="h-[120px] w-full" />
                <Skeleton className="h-[120px] w-full" />
              </div>
            ) : (
              industryNews.vcRaises.map((news) => (
                <NewsCard key={news.id} title={news.title} description={news.description} shortDescription={news.shortDescription} link={news.link} />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-black">Market Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ImageCard
          title="Smart Contract Deployments"
          imageSrc="https://tokenterminal.com/terminal/metrics/contracts-deployed?v=ZDM5OTM3YTc5OGEyY2I4YWRiNjQ4MDQz/embed/competitive-landscape"
          link="https://tokenterminal.com/terminal/metrics/contracts-deployed"
        />
        <ImageCard
          title="Revenue"
          imageSrc="https://tokenterminal.com/terminal/metrics/revenue?v=YTA1NjFmY2IyZmViNjQ5ODNkNDk3YjQ4/embed/competitive-landscape"
          link="https://tokenterminal.com/terminal/metrics/revenue"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-black">Project Spotlight</h2>
      <ProjectSpotlight project={projectSpotlight} />
    </div>
  );
};

export default Index;
