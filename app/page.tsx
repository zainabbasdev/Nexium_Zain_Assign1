import QuoteForm from "@/components/QuoteForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quote Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring quotes from great minds throughout history. Search by topic, explore our curated collection, or find your daily dose of motivation.
          </p>
        </div>
        <QuoteForm />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="max-w-4xl mx-auto p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30">
            <p className="mb-2">
              &ldquo;The best quotes inspire us to be better versions of ourselves.&rdquo;
            </p>
            <p className="text-xs">
              Made with ❤️ for quote enthusiasts everywhere
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
