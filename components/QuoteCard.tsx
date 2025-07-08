import { Quote } from "@/lib/qoutes";
import { useState } from "react";

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

export default function QuoteCard({ quote, index }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `"${quote.text}" - ${quote.author}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Inspiring Quote',
        text: `"${quote.text}" - ${quote.author}`,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-1 h-20 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <div className="flex-1 min-w-0">
          <blockquote className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <div className="flex items-center justify-between">
            <cite className="text-blue-600 font-semibold text-sm">
              — {quote.author}
            </cite>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                title="Copy quote"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                title="Share quote"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium capitalize">
              {quote.topic}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
