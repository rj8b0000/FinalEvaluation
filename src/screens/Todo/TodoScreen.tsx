import { StyleSheet, View, FlatList } from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';
import { GlobalStyles } from '../../theme/styles';
import TaskList from './component/TaskList';
import AddTask from './component/AddTask';
import AddTaskBtn from './component/AddTaskBtn';
import FilterModal from './component/FilterModal';
import TodoHeader from './component/TodoHeader';
import { Colors } from '../../theme';
import type { Task, Todo } from '../../types';
import { useTodoLogic } from './hooks/useTodoLogic';

const TodoScreen = () => {
  const tasks = useSelector((state: any) => state.todo.tasks);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const {
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
  } = useTodoLogic(tasks);
  return (
    <SafeAreaView
      style={[
        GlobalStyles.container,
        { backgroundColor: isDarkMode ? Colors.body : Colors.white },
      ]}
    >
      <View style={styles.localContainer}>
        <TodoHeader
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          toggleModal={toggleModal}
        />
        <FilterModal
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          radioButtons={radioButtons}
          onSelectTask={onSelectTask}
          filter={filter}
        />
        <AddTaskBtn onPressAction={() => showAddTask(true)} />
        {addTask ? (
          <AddTask
            onPressAction={() => showAddTask(false)}
            isDarkMode={isDarkMode}
            text={text}
            setText={setText}
            newTask={newTask}
          />
        ) : null}
        {tasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id.toString()}
            renderItem={item => {
              return <TaskList item={item} isDarkMode={isDarkMode} />;
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  localContainer: {
    padding: '4%',
  },
});
