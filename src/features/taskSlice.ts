import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/taskTypes";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push({
        ...action.payload,
        startDate: action.payload.startDate ?? new Date().toISOString(),
        endDate: action.payload.endDate ?? new Date().toISOString(),
      });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          startDate: action.payload.startDate ?? state.tasks[index].startDate,
          endDate: action.payload.endDate ?? state.tasks[index].endDate,
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
