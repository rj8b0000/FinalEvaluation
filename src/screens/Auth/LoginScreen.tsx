import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { JSX, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AntDesign from '@react-native-vector-icons/ant-design';
import { RootStackParamList } from '../../navigator/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalStyles } from '../../theme/styles';
import { login } from '../../services/auth';
import { Radius, Spacing, Typography } from '../../theme';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be of minimum 6 charaters')
    .required('Password is required'),
});
const LoginScreen = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyles.paddingInContainer}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await login(values.email, values.password).then(() => {
                resetForm();
              });
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
                case 'auth/invalid-credential':
                  // Prompt the user for the correct password
                  Alert.alert('Incorrect password. Please try again.');
                  break;
                case 'auth/invalid-email':
                  // Inform the user that the email address format is invalid
                  Alert.alert('The email address is not valid.');
                  break;
                case 'auth/user-disabled':
                  // Inform the user their account has been disabled
                  Alert.alert(
                    'Your account has been disabled by an administrator.',
                  );
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
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Login User </Text>
              </View>
              <View style={{ height: Spacing.sm }} />
              <View style={styles.inputContainer}>
                <Text style={styles.labelTxt}>Enter email</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    style={styles.txtInput}
                    keyboardType="email-address"
                    onBlur={handleBlur('email')}
                  />
                </TouchableWithoutFeedback>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors?.email}</Text>
                )}
                <View style={{ height: Spacing.sm }} />
                <Text style={styles.labelTxt}>Enter password</Text>
                <View style={styles.passInput}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      style={[
                        styles.txtInput,
                        { width: '90%', borderWidth: 0 },
                      ]}
                      secureTextEntry={showPassword ? false : true}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <AntDesign
                      name={showPassword ? 'eye' : 'eye-invisible'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors?.password}</Text>
                )}

                <View style={{ marginTop: '7%' }}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.addPostText}>Login</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <Text style={{ fontSize: 16 }}>
                    Don't Have An Account ? Sign Up{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  txtInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: Spacing.sm,
    width: '100%',
    borderRadius: Radius.md,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  inputContainer: {
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    marginTop: '1%',
  },
  labelTxt: {
    ...Typography.label,
    fontWeight: '600',
    marginVertical: '2%',
  },
  passInput: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    ...Typography.title,
    fontWeight: 'bold',
  },
  addPostText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#000',
    padding: '2%',
    textAlign: 'center',
    borderRadius: 12,
  },
});
