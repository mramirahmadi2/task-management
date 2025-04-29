import { Task } from "../types/taskTypes";

const TASKS_STORAGE_KEY = 'tasks';

export const getTasks = async (): Promise<Task[]> => {
  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  return tasksJson ? JSON.parse(tasksJson) : [];
};

export const addTask = async (task: Task): Promise<Task> => {
  const tasks = await getTasks();
  const newTasks = [...tasks, task];
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
  return task;
};

export const updateTask = async (taskId: string, task: Task): Promise<Task> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(t => t.id === taskId ? task : t);
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  return task;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter(t => t.id !== taskId);
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
}; 