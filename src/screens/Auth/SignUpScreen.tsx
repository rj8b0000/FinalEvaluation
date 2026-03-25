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
import React, { JSX } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import AntDesign from '@react-native-vector-icons/ant-design';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/types';
import { GlobalStyles } from '../../theme/styles';
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { useSignUp } from './hooks/useSignUp';
import { SignUpSchema } from './validaton/signUpValidation';
const SignUpScreen = (): JSX.Element => {
  type SignUpScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SignUp'
  >;
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const {
    showPassword,
    showConformPassword,
    togglePassword,
    toggleConfirmPassword,
    handleSignUp,
  } = useSignUp();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyles.paddingInContainer}
      >
        <Formik
          initialValues={{
            fullname: '',
            email: '',
            password: '',
            conformPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { resetForm }) => handleSignUp(values, resetForm)}
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
                <Text style={styles.title}>Sign Up </Text>
              </View>
              <View style={{ height: Spacing.sm }} />

              <View style={styles.inputContainer}>
                <Text style={styles.labelTxt}>Enter full name</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    placeholder="Enter Fullname"
                    value={values.fullname}
                    onChangeText={handleChange('fullname')}
                    style={styles.txtInput}
                    keyboardType="default"
                    onBlur={handleBlur('fullname')}
                  />
                </TouchableWithoutFeedback>
                {touched.fullname && errors.fullname && (
                  <Text style={styles.errorText}>{errors?.fullname}</Text>
                )}
                <View style={{ height: Spacing.sm }} />

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
                <View style={{ height: Spacing.sm }} />

                <Text style={styles.labelTxt}>Confirm password</Text>
                <View style={styles.passInput}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      placeholder="Confirm Password"
                      value={values.conformPassword}
                      onChangeText={handleChange('conformPassword')}
                      onBlur={handleBlur('password')}
                      style={[
                        styles.txtInput,
                        { width: '90%', borderWidth: 0 },
                      ]}
                      secureTextEntry={showConformPassword ? false : true}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableOpacity onPress={toggleConfirmPassword}>
                    <AntDesign
                      name={showConformPassword ? 'eye' : 'eye-invisible'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {touched.conformPassword && errors.conformPassword && (
                  <Text style={styles.errorText}>
                    {errors?.conformPassword}
                  </Text>
                )}
                <View style={{ height: Spacing.sm }} />

                <View style={{ marginTop: '7%' }}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.addPostText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{ fontSize: 16 }}>
                    Already Have An Account ? Login{' '}
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

export default SignUpScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    ...Typography.title,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    padding: '5%',
  },
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
  infoContainer: {
    width: '100%',
    height: '25%',
    justifyContent: 'space-between',
    marginTop: '5%',
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
    borderRadius: Spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Spacing.sm,
  },
  addPostText: {
    ...Typography.buttonText,
    fontWeight: '600',
    color: Colors.white,
    backgroundColor: Colors.black,
    padding: Spacing.sm,
    textAlign: 'center',
    borderRadius: Radius.md,
  },
});
