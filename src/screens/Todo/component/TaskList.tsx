import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, removeTask } from '../../../redux/todoSlice';

const TaskList = ({ item, isDarkMode }: { item: any; isDarkMode: boolean }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.itemContainer}>
      <Text
        style={[
          styles.taskText,
          {
            textDecorationLine: item.item.completed ? 'line-through' : 'none',
          },
          {
            color: isDarkMode ? '#fff' : '#000',
            borderWidth: 1,
            borderColor: isDarkMode ? '#fff' : '#000',
          },
        ]}
      >
        {item.item.taskName}
      </Text>
      <TouchableOpacity
        style={[
          styles.baseActionButton,
          {
            backgroundColor: item.item.completed ? '#95afc0' : '#30336b',
          },
        ]}
        onPress={() => dispatch(toggleTask(item.item.id))}
      >
        <Text style={styles.actionButtonText}>
          {item.item.completed ? 'Mark Undone' : 'Mark done'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => dispatch(removeTask(item.item))}
      >
        <Text style={styles.actionButtonText}>{'Remove Task'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  addTaskButton: {
    padding: '4%',
    marginTop: '6%',
    borderRadius: 10,
    backgroundColor: '#686de0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '4%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '4%',
    width: '58%',
  },
  saveButton: {
    padding: '2%',
    borderRadius: 10,
    backgroundColor: '#6ab04c',
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    padding: '2%',
    borderRadius: 10,
    backgroundColor: '#eb4d4b',
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: '4%',
  },
  taskText: {
    fontSize: 18,
    borderRadius: 10,
    padding: '2%',
    width: '58%',
  },
  baseActionButton: {
    padding: '2%',
    borderRadius: 10,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
