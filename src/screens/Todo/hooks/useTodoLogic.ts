import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskToList } from '../../../redux/todoSlice';
import type { Task } from '../../../types';

export const useTodoLogic = (tasks: Task[]) => {
  const dispatch = useDispatch();

  const [addTask, showAddTask] = useState(false);
  const [text, setText] = useState('');
  const [id, setId] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('0');

  const radioButtons = useMemo(
    () => [
      { id: '0', completed: 'all', label: 'All Tasks' },
      { id: '1', completed: true, label: 'Done' },
      { id: '2', completed: false, label: 'Un Done' },
    ],
    [],
  );

  const toggleModal = () => {
    setModalVisible(prev => !prev);
  };

  const newTask = () => {
    const task = {
      id,
      taskName: text,
      completed: false,
    };

    dispatch(addTaskToList(task));
    setId(prev => prev + 1);
    showAddTask(false);
    setText('');
  };

  const onSelectTask = (id: string) => {
    setFilter(id);
    toggleModal();
  };

  const selectedTasks = useMemo(() => {
    return radioButtons.find(rb => rb.id === filter)?.completed;
  }, [filter, radioButtons]);

  const filteredTasks = useMemo(() => {
    if (selectedTasks === 'all') return tasks;
    return tasks.filter(task => task.completed === selectedTasks);
  }, [tasks, selectedTasks]);

  return {
    addTask,
    showAddTask,
    text,
    setText,
    isModalVisible,
    toggleModal,
    filter,
    radioButtons,
    onSelectTask,
    newTask,
    filteredTasks,
  };
};
