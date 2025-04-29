import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/taskTypes";
import { getTasks, addTask, updateTask, deleteTask } from "../services/localStorageService";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError } = taskSlice.actions;

// Thunk actions
export const loadTasks = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const tasks = await getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTask = (task: Omit<Task, "id">) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const newTask = await addTask({ ...task, id: crypto.randomUUID() });
    const tasks = await getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTaskAction = (task: Task) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await updateTask(task.id, task);
    const tasks = await getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeTask = (taskId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await deleteTask(taskId);
    const tasks = await getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export default taskSlice.reducer;
