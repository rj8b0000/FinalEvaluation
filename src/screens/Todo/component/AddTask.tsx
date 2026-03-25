import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import type { AddTask as AddTaskProps } from '../../../types';
import { Colors, Spacing, Typography } from '../../../theme';

const AddTask: React.FC<AddTaskProps> = ({
  onPressAction,
  isDarkMode,
  text,
  setText,
  newTask,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDarkMode ? Colors.white : Colors.black,
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Enter the Task"
        placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
      />
      <TouchableOpacity style={styles.saveButton} onPress={newTask}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onPressAction}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
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
  buttonText: {
    ...Typography.buttonText,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
