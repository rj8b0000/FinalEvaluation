import { useState } from 'react';
import { Alert } from 'react-native';
import { login } from '../../../services/auth';

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (
    values: { email: string; password: string },
    resetForm: () => void,
  ) => {
    try {
      await login(values.email, values.password);

      resetForm();
    } catch (error: any) {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/user-not-found':
          Alert.alert('User not found for this email address.');
          break;

        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          Alert.alert('Incorrect password. Please try again.');
          break;

        case 'auth/invalid-email':
          Alert.alert('The email address is not valid.');
          break;

        case 'auth/user-disabled':
          Alert.alert('Your account has been disabled by an administrator.');
          break;

        case 'auth/too-many-requests':
          Alert.alert('Too many login attempts. Please try again later.');
          break;

        default:
          Alert.alert('Login failed', error.message);
      }
    }
  };

  return {
    showPassword,
    togglePassword,
    handleLogin,
  };
};
