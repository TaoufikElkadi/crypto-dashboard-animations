import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ExternalLink, Menu } from 'lucide-react';

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

const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          {/* Placeholder for logo */}
          <span className="text-blue-800 font-bold text-xl">B</span>
        </div>
        <h1 className="text-2xl font-bold">Bitvavo Insights</h1>
      </div>
      <nav>
        <button className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200">
          <Menu className="h-6 w-6" />
        </button>
      </nav>
    </div>
  </header>
);

const Index = () => {
  const { data: industryNews, isLoading: isLoadingNews } = useQuery({
    queryKey: ['industryNews'],
    queryFn: fetchIndustryNews,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center text-gray-800"
        >
          Crypto Market Overview
        </motion.h2>
        
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Industry News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {isLoadingNews ? (
                  <>
                    <Skeleton className="h-[120px] w-full" />
                    <Skeleton className="h-[120px] w-full" />
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Brand Partnerships</h3>
                      {industryNews.partnerships.map((news) => (
                        <NewsCard key={news.id} {...news} />
                      ))}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">VC Raises & Announcements</h3>
                      {industryNews.vcRaises.map((news) => (
                        <NewsCard key={news.id} {...news} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Market Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <ImageCard
                  title="Smart Contract Deployments"
                  imageSrc="/placeholder.svg"
                  link="https://tokenterminal.com/terminal/metrics/contracts-deployed"
                />
                <ImageCard
                  title="Revenue"
                  imageSrc="/placeholder.svg"
                  link="https://tokenterminal.com/terminal/metrics/revenue"
                />
              </div>
              <ImageCard
                title="Total Value Locked"
                imageSrc="/placeholder.svg"
                link="https://tokenterminal.com/terminal/metrics/tvl"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-black">Project Spotlight: Story Protocol</CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src="/story-protocol.png" 
              alt="Story Protocol for beginners" 
              className="w-full h-auto object-contain rounded-lg shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600">
              Story Protocol is the world's first IP Blockchain, designed to make intellectual property programmable. 
              It offers a universal license agreement to tokenize IP and set legally binding license terms. 
              The protocol uses a Proof-of-Creativity mechanism to manage licenses (ERC-721) and royalties (ERC-20), 
              powering applications from AI models to creator tools and IPFi.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
