import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  fullname: Yup.string().required('Full name is required'),

  email: Yup.string().email('Invalid Email').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be of minimum 6 characters')
    .required('Password is required'),

  conformPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match',
  ),
});
