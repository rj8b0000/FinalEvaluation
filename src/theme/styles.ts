import { StyleSheet } from 'react-native';
import Colors from './colors';
import Typography from './typography';
import Spacing from './spacing';
import Radius from './radius';
import responsive from '../styles/responsive';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  paddingInContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  imageFull: {
    width: '100%',
    height: '100%',
  },
});
