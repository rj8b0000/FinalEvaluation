import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import type { AddTask as AddTaskProps } from '../../../types';

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
            borderColor: isDarkMode ? '#fff' : '#000',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Enter the Task"
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
