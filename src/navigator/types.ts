import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Todo: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTab: NavigatorScreenParams<MainTabParamList>;
};
