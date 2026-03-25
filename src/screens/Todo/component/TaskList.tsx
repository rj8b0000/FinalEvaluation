import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, removeTask } from '../../../redux/todoSlice';
import { Colors, Spacing, Typography } from '../../../theme';

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
            color: isDarkMode ? Colors.white : Colors.black,
            borderWidth: 1,
            borderColor: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {item.item.taskName}
      </Text>
      <TouchableOpacity
        style={[
          styles.baseActionButton,
          {
            backgroundColor: item.item.completed
              ? Colors.lightBlue
              : Colors.darkBlue,
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
    borderRadius: Spacing.md,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    ...Typography.buttonText,
    fontWeight: 'bold',
    color: Colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '4%',
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.md,
    paddingHorizontal: '4%',
    width: '58%',
  },
  saveButton: {
    padding: '2%',
    borderRadius: Spacing.md,
    backgroundColor: Colors.green,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    padding: '2%',
    borderRadius: Spacing.md,
    backgroundColor: Colors.red,
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
    ...Typography.buttonText,
    borderRadius: Spacing.md,
    padding: '2%',
    width: '58%',
  },
  baseActionButton: {
    padding: '2%',
    borderRadius: Spacing.md,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    ...Typography.actionButtonText,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
