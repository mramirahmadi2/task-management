import { Task, Goal } from "../types/taskTypes";

const TASKS_STORAGE_KEY = 'tasks';
const GOALS_STORAGE_KEY = 'goals';

// Task functions
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

// Goal functions
export const getGoals = async (): Promise<Goal[]> => {
  const goalsJson = localStorage.getItem(GOALS_STORAGE_KEY);
  return goalsJson ? JSON.parse(goalsJson) : [];
};

export const addGoal = async (goal: Goal): Promise<Goal> => {
  const goals = await getGoals();
  const newGoals = [...goals, goal];
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(newGoals));
  return goal;
};

export const updateGoal = async (goalId: string, goal: Goal): Promise<Goal> => {
  const goals = await getGoals();
  const updatedGoals = goals.map(g => g.id === goalId ? goal : g);
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(updatedGoals));
  return goal;
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  const goals = await getGoals();
  const filteredGoals = goals.filter(g => g.id !== goalId);
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(filteredGoals));
}; 