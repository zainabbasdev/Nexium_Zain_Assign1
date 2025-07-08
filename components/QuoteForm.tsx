"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getQuotesByTopic, getAllTopics, getRandomQuote, searchQuotes, Quote } from "@/lib/qoutes";
import QuoteCard from "./QuoteCard";
import LoadingSpinner from "./LoadingSpinner";

export default function QuoteForm() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<"topic" | "search">("topic");
  const availableTopics = getAllTopics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const results = searchMode === "topic" 
        ? getQuotesByTopic(topic) 
        : searchQuotes(topic);
      setQuotes(results);
      setIsLoading(false);
    }, 500);
  };

  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setSearchMode("topic");
    setIsLoading(true);
    setTimeout(() => {
      const results = getQuotesByTopic(selectedTopic);
      setQuotes(results);
      setIsLoading(false);
    }, 500);
  };

  const handleRandomQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomQuote = getRandomQuote();
      setQuotes([randomQuote]);
      setTopic("");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">Find Inspiring Quotes</h2>
        <p className="text-gray-600 text-lg">Search by topic, explore categories, or discover something new with a random quote</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSearchMode("topic")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            searchMode === "topic"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Search by Topic
        </button>
        <button
          onClick={() => setSearchMode("search")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            searchMode === "search"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Search All
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex gap-3">
          <Input
            placeholder={searchMode === "topic" 
              ? "Enter topic (e.g. inspiration, life, success)" 
              : "Search quotes, authors, or topics..."}
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="flex-1 bg-white/70 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4 rounded-xl"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !topic.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-all duration-200"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
          <Button
            type="button"
            onClick={handleRandomQuote}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-lg transition-all duration-200"
          >
            {isLoading ? "Loading..." : "Random Quote"}
          </Button>
        </div>
      </form>

      {searchMode === "topic" && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Popular Topics:</h3>
          <div className="flex flex-wrap gap-3">
            {availableTopics.map((topicName) => (
              <button
                key={topicName}
                onClick={() => handleTopicClick(topicName)}
                disabled={isLoading}
                className="px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 capitalize disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {topicName}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {!isLoading && quotes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">
              {topic ? `Results for "${topic}"` : "Random Quote"}
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {quotes.length} quote{quotes.length !== 1 ? 's' : ''} found
            </span>
          </div>
          <div className="grid gap-6">
            {quotes.map((quote, i) => (
              <QuoteCard key={i} quote={quote} index={i} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && quotes.length === 0 && topic && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-lg text-gray-500 mb-2">
            No quotes found for "{topic}"
          </p>
          <p className="text-gray-400">
            {searchMode === "topic" 
              ? "Try one of the popular topics above!" 
              : "Try a different search term or browse by topic."}
          </p>
        </div>
      )}
    </div>
  );
}
