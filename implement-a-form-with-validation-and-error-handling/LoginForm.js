import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = { email: '', password: '' };
const fields = [
  {
    name: 'email',
    placeholder: 'Email',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
    errorMessage: 'Please enter a valid email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    secureTextEntry: true,
    errorMessage: 'Please enter your password',
  },
];

const LoginForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          {fields.map((field) => (
            <View key={field.name}>
              <TextInput
                name={field.name}
                onChangeText={handleChange(field.name)}
                onBlur={handleBlur(field.name)}
                value={values[field.name]}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                autoCapitalize={field.autoCapitalize}
                autoCorrect={field.autoCorrect}
                secureTextEntry={field.secureTextEntry}
              />
              <Text style={{ color: 'red' }}>{errors[field.name]}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;


