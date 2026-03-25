import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/types';
import { GlobalStyles } from '../../theme/styles';
import { getUsers } from '../../services/userService';
import UserCard from './component/UserCard';
import { Colors, Spacing } from '../../theme';

const HomeScreen = () => {
  type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MainTab'
  >;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();
      console.log(response.data);
      if (response.status == 200) {
        const newData = response?.data || [];
        setUsers(newData);
      }
    } catch (err: any) {
      if (err.response) {
        console.log('Server Logged with: ', err.response.status);
        setError('Something went wrong. Please try again later');
      } else if (err.request) {
        console.log('Requst error', err.request);
        console.log('No response recieved');
        setError('Something went wrong. Please try again later');
      } else {
        console.log('Axios error: ', err.message);
        setError('Something went wrong. Please try again later');
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  const renderFooter = () => {
    return <View style={{ height: 50 }} />;
  };
  return (
    <SafeAreaView
      style={[GlobalStyles.container, styles.safeArea]}
      edges={['top']}
    >
      <View style={styles.localContainer}>
        {error && <Text style={styles.emptyText}>{error}</Text>}
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => <UserCard item={item} />}
          ItemSeparatorComponent={<View style={{ height: 10 }} />}
          onRefresh={() => fetchUsers()}
          refreshing={loading}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No data available</Text>
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
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
