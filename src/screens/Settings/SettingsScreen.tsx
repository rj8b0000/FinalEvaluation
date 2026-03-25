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
import { Radius, Spacing, Typography } from '../../theme';

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
                  <MaterialIcons name="camera-alt" size={40} color="#666" />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <Text style={styles.labelTxt}>Name</Text>
              <TextInput
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
                style={styles.txtInput}
              />
              <View style={{ height: Spacing.sm }} />

              <Text style={styles.labelTxt}>Email</Text>
              <TextInput
                placeholder="Enter Email"
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
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.txtInput, { width: '90%', borderWidth: 0 }]}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <AntDesign
                    name={showPassword ? 'eye' : 'eye-invisible'}
                    size={20}
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
  },
  imagePickerContainer: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: '5%',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: Spacing.sm,
    width: '100%',
    borderRadius: Radius.md,
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
  saveButton: {
    backgroundColor: '#000',
    padding: '3.5%',
    borderRadius: 12,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#eb4d4b',
    padding: '3.5%',
    borderRadius: 12,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
