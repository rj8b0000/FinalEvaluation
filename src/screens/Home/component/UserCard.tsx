import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Users } from '../../../types';
import { Colors, Radius, Spacing, Typography } from '../../../theme';

interface UserComponentProp {
  item: Users;
}
const UserCard: React.FC<UserComponentProp> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Id - {item.id}</Text>
      <Text style={styles.text}>Name - {item.name}</Text>
      <Text style={styles.text}>Username - {item.username}</Text>
      <Text style={styles.text}>Email - {item.email}</Text>
      <Text style={styles.text}>Phone - {item.phone}</Text>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.2,
    marginVertical: Spacing.xs,
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.lightGrey,
  },
  text: { ...Typography.label, fontWeight: '600', lineHeight: 24 },
});
