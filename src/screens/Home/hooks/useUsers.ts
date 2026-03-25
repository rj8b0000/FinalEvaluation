import { useEffect, useState, useCallback } from 'react';
import { getUsers } from '../../../services/userService';

export const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      if (response?.status === 200) {
        setUsers(response?.data || []);
        setError('');
      }
    } catch (err: any) {
      console.log('Fetch users error:', err?.message);

      setError('Something went wrong. Please try again later');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
};
