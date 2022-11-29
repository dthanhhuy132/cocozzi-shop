import * as Yup from 'yup';

const validateLoginSchema = {
   email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email của bạn!'),
   password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Please enter your password!'),
};
const validateRegisterSchema = {
   email: Yup.string()
      .email('Invalid email format')
      .required('Please enter your email!'),
   phone: Yup.string()
      .matches(
         /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
         'Số điện thoại không phù hợp'
      )
      .required('Please enter your phone number!'),
   password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .required('Please enter your password!'),
   repassword: Yup.string()
      .oneOf([Yup.ref('password')], "Password's not match")
      .required('Please enter re-password'),
};

export {validateLoginSchema, validateRegisterSchema};
