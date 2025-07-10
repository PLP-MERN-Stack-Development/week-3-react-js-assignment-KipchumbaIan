import TaskManager from '../components/features/TaskManager';

const Tasks = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Task Manager</h1>
      <TaskManager />
    </div>
  );
};

export default Tasks;