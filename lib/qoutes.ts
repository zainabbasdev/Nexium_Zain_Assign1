import quotes from "../qoutes.json" assert { type: "json" };

export interface Quote {
  topic: string;
  text: string;
  author: string;
}

export function getQuotesByTopic(topic: string): Quote[] {
  return quotes.filter(q => q.topic.toLowerCase() === topic.toLowerCase()).slice(0, 5);
}

export function getAllTopics(): string[] {
  const topics = [...new Set(quotes.map(q => q.topic))];
  return topics.sort();
}

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export function getQuotesByAuthor(author: string): Quote[] {
  return quotes.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));
}

export function searchQuotes(searchTerm: string): Quote[] {
  const term = searchTerm.toLowerCase();
  return quotes.filter(q => 
    q.text.toLowerCase().includes(term) || 
    q.author.toLowerCase().includes(term) ||
    q.topic.toLowerCase().includes(term)
  );
}
