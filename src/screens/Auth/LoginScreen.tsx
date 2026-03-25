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
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { LoginSchema } from './validaton/loginValidation';
import { useLogin } from './hooks/useLogin';
const LoginScreen = (): JSX.Element => {
  type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  const { showPassword, togglePassword, handleLogin } = useLogin();
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
          onSubmit={(values, { resetForm }) => handleLogin(values, resetForm)}
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
                  <TouchableOpacity onPress={togglePassword}>
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
    borderColor: Colors.black,
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
    color: Colors.red,
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
    borderRadius: Spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Spacing.sm,
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
    ...Typography.buttonText,
    fontWeight: '600',
    color: Colors.white,
    backgroundColor: Colors.black,
    padding: Spacing.sm,
    textAlign: 'center',
    borderRadius: 12,
  },
});
