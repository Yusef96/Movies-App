import React from 'react'

import axios from 'axios';
import { useFormik } from 'formik'
import * as Yub from 'yup'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  

  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState(null)
  let navigate = useNavigate()


  async function sendRegisterData(values) {
    // console.log(values);
    setError(null)
    setIsLoading(true)
    let {data} = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup',values).catch((err) => {
      setIsLoading(false)
    setError(err.response.data.message)
    })
    if(data.message == "success"){
      setIsLoading(false)
      console.log(data);
      navigate("/login")
    }

    
  }

  let myschema = Yub.object({
    name: Yub.string().required("name is required").min(3,"min char is 3").max(15,"max char is 15"),
    email: Yub.string().email("invalid email").required("required"),
    password: Yub.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("required"),
    rePassword: Yub.string().required("required").oneOf([Yub.ref('password')],"password does not match"),
    phone: Yub.string().required("required").matches(/^01[0125][0-9]{8}$/,"invalid")

  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema : myschema,
    onSubmit: (values) => sendRegisterData(values)
  })




  return (
    <>
      <div className="w-75 mx-auto">

        <h2>Register Now</h2>
        {/* {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ''} */}

        {error?<div className='alert alert-danger'>{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          
          <label htmlFor="name">Name :</label>
          <input type="text" name='name' id='name' className='form-control my-2' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}
          
          
          
          <label htmlFor="email">Email :</label>
          <input type="email" name='email' id='email' className='form-control my-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

          <label htmlFor="password">Password :</label>
          <input type="password" name='password' id='password' className='form-control my-2' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}

          <label htmlFor="rePassword">Repassword :</label>
          <input type="password" name='rePassword' id='rePassword' className='form-control my-2' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}

          <label htmlFor="phone">Phone :</label>
          <input type="tel" name='phone' id='phone' className='form-control my-2' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}



          {isLoading ?<button type='submit' className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> :  <button  className='btn bg-success text-white'>Register</button>}

        </form>


      </div>



    </>
  )
}
