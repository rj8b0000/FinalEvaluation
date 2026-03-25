import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../../theme/styles';
import UserCard from './component/UserCard';
import { Colors } from '../../theme';
import { useUsers } from './hooks/useUsers';

const HomeScreen = () => {
  const { users, loading, error, fetchUsers } = useUsers();

  const renderFooter = useCallback(() => {
    return <View style={{ height: 50 }} />;
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <SafeAreaView
      style={[GlobalStyles.container, styles.safeArea]}
      edges={['top']}
    >
      <View style={styles.localContainer}>
        {error ? <Text style={styles.emptyText}>{error}</Text> : null}

        <FlatList
          data={users}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <UserCard item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          refreshing={loading}
          onRefresh={fetchUsers}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No data available</Text>
          }
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  localContainer: {
    flex: 1,
    padding: '4%',
    backgroundColor: Colors.background,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
  emptyText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loader: {
    marginTop: '10%',
  },
});
