// src/theme/typography.js

import { moderateScale } from 'react-native-size-matters';

const ms = (size: number) => moderateScale(size);
const makeTextStyle = (fontSize: number) => ({
  fontSize: ms(fontSize),
});

export const Typography = {
  title: makeTextStyle(20),
  label: makeTextStyle(16),
  buttonText: makeTextStyle(14),
  actionButtonText: makeTextStyle(12),
};

export default Typography;
