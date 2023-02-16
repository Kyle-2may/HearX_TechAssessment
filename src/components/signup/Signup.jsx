import React, { useState } from 'react';
import './signup.css';
import logo from '../../assets/logo_Kyle.png';
import { Formik } from "formik";
import * as Yup from "yup";

const Signup = () => {

  const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const [isSubmitted, setIsSubmited] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Firstname is required")
      .min(3, "Firstname too short! Must be at least 3 characters."),
    lastname: Yup.string()
      .required("Lastname is required")
      .min(3, "Lastname too short! Must be at least 3 characters."),
    cellnumber: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegEx, 'Phone number is not valid'),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });
  
  console.log(isSubmitted);

  const handleSubmit = (
    { firstname, lastname, cellnumber, email },
    { setFieldError }
  ) => {
    setIsSubmited(true);
  };

  return isSubmitted ? <div className='hearx__Registered'>
    <h2>Thank You!</h2>
    <p>Registration complete</p>
    <p>Welcome to the family!</p>
    </div> :
    (
      <div>
        <img src={logo} alt="HearX_Logo" />
        <div className='hearx__form-container'>
          <h1>Register</h1>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              cellnumber: "",
              email: "",
              gender: "Non",
              receiveMail: false
            }}
            onSubmit={(values, errors) => {
              handleSubmit(values, errors);
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isValid, dirty }) => {
              return (
                <form className="hearx__signup-form" onSubmit={handleSubmit}>
                  <label >First Name</label>
                  <input type="text" placeholder='Firstname' id='firstname' value={values.firstname} onChange={handleChange("firstname")} onBlur={handleBlur("firstname")} className={touched.firstname && errors.firstname ? "hearx__signup-form-invalid" : "hearx__signup-form-valid"} /><br />
                  <p>{touched.firstname && errors.firstname}</p>
                  <label >Last Name</label>
                  <input type="text" placeholder='Lastname' id='lastname' value={values.lastname} onChange={handleChange("lastname")} onBlur={handleBlur("lastname")} className={touched.lastname && errors.lastname ? "hearx__signup-form-invalid" : "hearx__signup-form-valid"}  /><br />
                  <p>{touched.lastname && errors.lastname}</p>
                  <label >Cellphone number</label>
                  <input type="number" placeholder='Cellphone number' id='cellnumber' value={values.cellnumber} onChange={handleChange("cellnumber")} onBlur={handleBlur("cellnumber")} className={touched.cellnumber && errors.cellnumber ? "hearx__signup-form-invalid" : "hearx__signup-form-valid"}  /><br />
                  <p>{touched.cellnumber && errors.cellnumber}</p>
                  <label>Email</label>
                  <input type="Email" placeholder='Email' id='Email' value={values.email} onChange={handleChange(("email"))} onBlur={handleBlur("email")} className={touched.email && errors.email ? "hearx__signup-form-invalid" : "hearx__signup-form-valid"} /><br />
                  <p>{touched.email && errors.email}</p>
                  <div className='hearx__Signup-radiobutton'>
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                    /><label>Male</label>
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                    /><label>Female</label>
                    <input
                      type="radio"
                      value="Non"
                      name="gender"
                      defaultChecked
                    /><label>Prefer not to say</label>
                  </div>
                  <div className='hearx__Signup-checkbox'>
                    <input type="checkbox" checked={values.receiveMail} onChange={handleChange("receiveMail")} />
                    <label>Would you like to be contacted?</label>
                  </div>
                  <button disabled={!(isValid && dirty)}>Submit</button>
                </form>
              );
            }}
          </Formik>
        </div >
      </div>
    )
}

export default Signup