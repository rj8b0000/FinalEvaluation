import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import type { AddTaskBtn as AddTaskBtnProps } from '../../../types';

const AddTaskBtn: React.FC<AddTaskBtnProps> = ({ onPressAction }) => {
  return (
    <TouchableOpacity style={styles.addTaskButton} onPress={onPressAction}>
      <Text style={styles.buttonText}>+ Add Task</Text>
    </TouchableOpacity>
  );
};

export default AddTaskBtn;

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
});
