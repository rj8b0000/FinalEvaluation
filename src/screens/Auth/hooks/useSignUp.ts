import { useState } from 'react';
import { Alert } from 'react-native';
import { signUp } from '../../../services/auth';

export const useSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const toggleConfirmPassword = () => setShowConformPassword(prev => !prev);

  const handleSignUp = async (values: any, resetForm: () => void) => {
    try {
      await signUp(values.email, values.password);

      resetForm();
      Alert.alert('Success', 'Account created successfully');
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
          Alert.alert('Too many attempts. Try again later.');
          break;

        default:
          Alert.alert('Sign up failed', error.message);
      }
    }
  };

  return {
    showPassword,
    showConformPassword,
    togglePassword,
    toggleConfirmPassword,
    handleSignUp,
  };
};
