import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { GlobalStyles } from '../../../theme/styles';
import Modal from 'react-native-modal';
import type { FilterModal as FilterModalProps } from '../../../types';
import { Colors, Spacing, Typography } from '../../../theme';

const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  toggleModal,
  radioButtons,
  onSelectTask,
  filter,
}) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <Text style={GlobalStyles.headerTitle}>Filter Tasks</Text>
        <View style={styles.filterContainer}>
          <RadioGroup
            containerStyle={styles.radioGroupContainer}
            radioButtons={radioButtons}
            onPress={onSelectTask}
            selectedId={filter}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalContent: {
    height: '23%',
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    padding: '4%',
  },
  filterContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: Spacing.md,
  },
  radioGroupContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
