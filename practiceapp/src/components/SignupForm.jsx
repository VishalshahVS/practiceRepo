import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      checkBoxData:[
        {checkBox:''},
        {checkBox:''},
        {checkBox:''},
        {checkBox:''},
      ]
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const check=[1,2,3,4]
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>

      {
        check.map((values,index) => {
            return <div className='checkBoxContainer' key={index}>
                    CheckBox {values}
                    <input 
                        type="checkbox"
                        name={`checkBoxData[${index}].checkBox`} 
                        value={formik.values.checkBoxData[index].checkBox}
                        onChange={formik.handleChange}
                    />
            </div>
        })
      }
    </form>
  );
};

export default SignupForm