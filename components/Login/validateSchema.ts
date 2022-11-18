import * as Yup from 'yup';

const validateLoginSchema = {
   email: Yup.string()
      .email('Invalid email format')
      .required('Please enter your email!'),
   password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Please enter your password!'),
};
const validateRegisterSchema = {
   email: Yup.string()
      .email('Invalid email format')
      .required('Please enter your email!'),
   password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Please enter your password!'),
   repassword: Yup.string()
      .oneOf([Yup.ref('password')], "Password's not match")
      .required('Please enter re-password'),
};

export {validateLoginSchema, validateRegisterSchema};
