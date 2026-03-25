export interface Users {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}
export interface TodoHeader {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleModal: () => void;
}
export interface FilterModal {
  isModalVisible: boolean;
  toggleModal: () => void;
  radioButtons: any[];
  onSelectTask: (id: string) => void;
  filter: string;
}
export interface AddTask {
  onPressAction: () => void;
  isDarkMode: boolean;
  text: string;
  setText: (text: string) => void;
  newTask: () => void;
}
export interface TaskList {
  item: {
    id: string;
    taskName: string;
    completed: boolean;
  };
  isDarkMode: boolean;
}
export interface AddTaskBtn {
  onPressAction: () => void;
}
export interface AddTask {
  onPressAction: () => void;
  isDarkMode: boolean;
  text: string;
  setText: (text: string) => void;
  newTask: () => void;
}
export interface Todo {
  tasks: Task[];
  addTask: boolean;
  isDarkMode: boolean;
  text: string;
  setText: (text: string) => void;
  newTask: () => void;
}
export interface Task {
  id: string;
  taskName: string;
  completed: boolean;
}
