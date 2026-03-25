import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { logout } from '../../services/auth';
import { GlobalStyles } from '../../theme/styles';
import { Colors, Radius, Spacing, Typography } from '../../theme';
import { moderateScale } from 'react-native-size-matters';

const SettingsScreen = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error');
      console.log(error);
    }
  };

  const handlePickImage = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
              setProfileImage(response.assets[0].uri || null);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets && response.assets.length > 0) {
              setProfileImage(response.assets[0].uri || null);
            }
          });
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[GlobalStyles.paddingInContainer, styles.scrollContainer]}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Settings</Text>
            </View>

            <TouchableOpacity
              onPress={handlePickImage}
              style={styles.imagePickerContainer}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.placeholderContainer}>
                  <MaterialIcons name="camera-alt" size={moderateScale(40)} color={Colors.placeholder} />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <Text style={styles.labelTxt}>Name</Text>
              <TextInput
                placeholder="Enter Name"
                placeholderTextColor={Colors.placeholder}
                value={name}
                onChangeText={setName}
                style={styles.txtInput}
              />
              <View style={{ height: Spacing.sm }} />

              <Text style={styles.labelTxt}>Email</Text>
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor={Colors.placeholder}
                value={email}
                onChangeText={setEmail}
                style={styles.txtInput}
                keyboardType="email-address"
              />
              <View style={{ height: Spacing.sm }} />

              <Text style={styles.labelTxt}>Password</Text>
              <View style={styles.passInput}>
                <TextInput
                  placeholder="Enter Password"
                  placeholderTextColor={Colors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.txtInput, { width: '90%', borderWidth: 0 }]}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <AntDesign
                    name={showPassword ? 'eye' : 'eye-invisible'}
                    size={moderateScale(20)}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: Spacing.md }} />
              
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              
              <View style={{ height: Spacing.sm }} />
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: Spacing.xl,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    fontWeight: 'bold',
    color: Colors.black,
  },
  imagePickerContainer: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
  },
  placeholderContainer: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: Spacing.md,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: Spacing.sm,
    width: '100%',
    borderRadius: Radius.md,
    color: Colors.black,
  },
  labelTxt: {
    ...Typography.label,
    fontWeight: '600',
    marginVertical: Spacing.xs,
    color: Colors.body,
  },
  passInput: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: Radius.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Spacing.sm,
  },
  saveButton: {
    backgroundColor: Colors.black,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: Colors.red,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.buttonText,
    fontWeight: '600',
    color: Colors.white,
  },
});
