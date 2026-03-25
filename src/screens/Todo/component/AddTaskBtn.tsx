import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import type { AddTaskBtn as AddTaskBtnProps } from '../../../types';
import { Colors, Spacing, Typography } from '../../../theme';

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
    borderRadius: Spacing.md,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    ...Typography.buttonText,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
