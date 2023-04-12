import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

// Define a validation schema for the form fields
const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

// Define initial values for the form fields
const initialValues = { email: '', password: '' };

// Define an array of objects that describe the form fields
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

// Define the LoginForm component
const LoginForm = () => {
  return (
    // Wrap the form with Formik and pass the initial values and validation schema as props
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // Define the submit function that will be called when the form is submitted
      onSubmit={(values) => console.log(values)}
    >
      {/* Pass a function as a child to Formik that renders the form fields */}
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <>
          {/* Loop through the array of fields and render each one */}
          {fields.map((field) => (
            <View key={field.name}>
              {/* Render a TextInput for each field */}
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
              {/* Render an error message for each field */}
              <Text style={{ color: 'red' }}>{errors[field.name]}</Text>
            </View>
          ))}
          {/* Render a button to submit the form with an onPress handler that calls the handleSubmit function
          */}
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

// Export the LoginForm component
export default LoginForm;