import { Alert } from 'react-native';
import { auth } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

const authInstance = getAuth();
export const signUp = async (email: string, password: string) => {
  try {
    const userCredentail = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password,
    );
    return userCredentail.user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // Handle specific error codes
    switch (errorCode) {
      case 'auth/user-not-found':
        // Display a message that the email is not registered
        Alert.alert('User not found for this email address.');
        break;
      case 'auth/wrong-password':
        // Prompt the user for the correct password
        Alert.alert('Incorrect password. Please try again.');
        break;
      case 'auth/invalid-email':
        // Inform the user that the email address format is invalid
        Alert.alert('The email address is not valid.');
        break;
      case 'auth/user-disabled':
        // Inform the user their account has been disabled
        Alert.alert('Your account has been disabled by an administrator.');
        break;
      case 'auth/too-many-requests':
        // Inform the user to try again later, or implement CAPTCHA
        Alert.alert(
          'Too many login attempts. Please try again later or use CAPTCHA verification.',
        );
        break;
      // Handle other common errors
      default:
        Alert.alert(`Login failed: ${errorMessage}`);
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCrendetial = signInWithEmailAndPassword(
      authInstance,
      email,
      password,
    );
    return (await userCrendetial).user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    // Handle specific error codes
    switch (errorCode) {
      case 'auth/user-not-found':
        // Display a message that the email is not registered
        Alert.alert('User not found for this email address.');
        break;
      case 'auth/wrong-password':
        // Prompt the user for the correct password
        Alert.alert('Incorrect password. Please try again.');
        break;
      case 'auth/invalid-email':
        // Inform the user that the email address format is invalid
        Alert.alert('The email address is not valid.');
        break;
      case 'auth/user-disabled':
        // Inform the user their account has been disabled
        Alert.alert('Your account has been disabled by an administrator.');
        break;
      case 'auth/too-many-requests':
        // Inform the user to try again later, or implement CAPTCHA
        Alert.alert(
          'Too many login attempts. Please try again later or use CAPTCHA verification.',
        );
        break;
      // Handle other common errors
      default:
        Alert.alert(`Login failed: ${errorMessage}`);
    }
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};
