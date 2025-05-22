import { useEffect, useState } from 'react';

interface NewsItem {
  date: string;
  title: string;
  link: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'pub_8635776a235f3cbecf2675ec41ae9aef48a00';
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&language=en&q=crypto`
        );
        const data = await response.json();
        const formattedNews: NewsItem[] = data.results.map((item: any) => ({
          date: new Date(item.pubDate).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
          }),
          title: item.title,
          link: item.link
        }));
        setNews(formattedNews);
      } catch {
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="p-6 text-gray-400">Loading news...</div>;
  if (error)   return <div className="p-6 text-red-500">{error}</div>;

  return (
    <section className="py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">News and information</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 9).map((item, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6 flex flex-col h-full">
            <span className="text-sm text-gray-400 mb-2">{item.date}</span>
            <h3 className="text-lg font-semibold text-white mb-4 flex-grow">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                {item.title}
              </a>
            </h3>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300"
            >
              Check the details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
