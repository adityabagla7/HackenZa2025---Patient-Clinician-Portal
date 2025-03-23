import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm: React.FC = () => {
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    bloodGroup: Yup.string()
      .required('Blood group is required')
      .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid blood group'),
  });

  const handleSubmit = (values) => {
    if (!values.bloodGroup || values.bloodGroup.trim() === '') {
      setErrors({ ...errors, bloodGroup: 'Blood group is required' });
      return;
    }
  };

  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* ... existing form fields ... */}
          {errors.bloodGroup && (
            <div className="error">{errors.bloodGroup}</div>
          )}
          {/* ... existing form fields ... */}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm; 