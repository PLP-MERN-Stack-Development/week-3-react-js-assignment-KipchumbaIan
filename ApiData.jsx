import { useState, useEffect } from 'react';
import { fetchPosts, searchPosts } from '../utils/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(page);
      setPosts(prev => page === 1 ? data : [...prev, ...data]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setPage(1);
      loadPosts();
      return;
    }
    
    try {
      setSearching(true);
      setLoading(true);
      const data = await searchPosts(searchQuery);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to search posts. Please try again later.');
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  const loadMore = () => {
    if (!searching) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (!searching) {
      loadPosts();
    }
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">API Data</h1>
      
      <form onSubmit={handleSearch} className="mb-6 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button type="submit" className="rounded-l-none">
          Search
        </Button>
      </form>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Card key={post.id} title={post.title} className="h-full">
            <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
          </Card>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && !searching && posts.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 my-12">No posts found.</p>
      )}
    </div>
  );
};

export default ApiData;