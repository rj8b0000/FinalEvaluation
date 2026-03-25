import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@react-native-vector-icons/ant-design';
import { GlobalStyles } from '../../../theme/styles';
import { Colors, Spacing } from '../../../theme';
import type { TodoHeader as TodoHeaderProps } from '../../../types';

const TodoHeader: React.FC<TodoHeaderProps> = ({
  isDarkMode,
  toggleTheme,
  toggleModal,
}) => {
  return (
    <View style={styles.headerRow}>
      <Text
        style={[
          GlobalStyles.headerTitle,
          { color: isDarkMode ? Colors.white : Colors.black },
        ]}
      >
        Todo App
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleTheme}>
          <AntDesign
            name={isDarkMode ? 'sun' : 'moon'}
            size={24}
            color={isDarkMode ? Colors.yellow : Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <AntDesign
            name="more"
            size={24}
            color={isDarkMode ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
});
