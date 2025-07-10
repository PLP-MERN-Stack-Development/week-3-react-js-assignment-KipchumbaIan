import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">React with Tailwind CSS</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">A responsive application demonstrating component architecture, state management, and API integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card title="Component Architecture" className="transform transition-transform hover:scale-105">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Explore reusable UI components built with React and styled with Tailwind CSS.
          </p>
          <div className="flex justify-center space-x-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Card>

        <Card title="Task Management" className="transform transition-transform hover:scale-105">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Try our task manager with local storage persistence and filtering capabilities.
          </p>
          <Link to="/tasks">
            <Button className="w-full">Go to Tasks</Button>
          </Link>
        </Card>

        <Card title="API Integration" className="transform transition-transform hover:scale-105">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            See how we fetch and display data from JSONPlaceholder with search and pagination.
          </p>
          <Link to="/api-data">
            <Button className="w-full">View API Data</Button>
          </Link>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
        <p className="mb-6">Check out the different sections of this application to see React and Tailwind CSS in action.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/tasks">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Task Manager</Button>
          </Link>
          <Link to="/api-data">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">API Data</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;