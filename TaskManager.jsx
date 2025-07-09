import { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from '../ui/Button';
import Card from '../ui/Card';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <Card title="Task Manager" className="max-w-2xl mx-auto">
      <form onSubmit={addTask} className="mb-6 flex">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button type="submit" className="rounded-l-none">
          Add Task
        </Button>
      </form>

      <div className="mb-4 flex space-x-2">
        <Button 
          variant={filter === 'all' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('all')}
          className="text-sm"
        >
          All
        </Button>
        <Button 
          variant={filter === 'active' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('active')}
          className="text-sm"
        >
          Active
        </Button>
        <Button 
          variant={filter === 'completed' ? 'primary' : 'secondary'} 
          onClick={() => setFilter('completed')}
          className="text-sm"
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-3 border rounded dark:border-gray-700">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                  {task.text}
                </span>
              </div>
              <Button variant="danger" onClick={() => deleteTask(task.id)} className="text-sm px-2 py-1">
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
};

export default TaskManager;