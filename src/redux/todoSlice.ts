import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTaskToList: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string | number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action: PayloadAction<{ id: string | number }>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    },
  },
});
export const { addTaskToList, toggleTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;
