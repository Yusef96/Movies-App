import React from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yub from 'yup'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUser}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  let navigate = useNavigate()

  function goBack(){
    navigate("/register")
    // console.log("gello from goback");
  }

  async function login(values) {
    // console.log(values);
    setError(null)
    setIsLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setIsLoading(false)
      setError(err.response.data.message)
    })
    if (data.message == "success") {
      setIsLoading(false)
      localStorage.setItem("userToken",data.token)
      saveUser()
      console.log(data);
      navigate("/home")
    }


  }

  let myschema = Yub.object({
    email: Yub.string().email("invalid email").required("required"),
    password:Yub.string().matches(/^[A-Za-z0-9]{6,20}$/,"invalid password ( password must be at least 6 characters long )").required("password is required"),
    // password:Yup.string().matches(/^[A-Za-z0-9]{6,20}$/,"invalid password ( password must be at least 6 characters long )").required("password is required"),

  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myschema,
    onSubmit: (values) => login(values)
  })

  return (
    <>
      <div className="w-75 mx-auto">

        <h2>Login Now</h2>
        {/* {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ''} */}

        {error ? <div className='alert alert-danger'>{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="email">Email :</label>
          <input type="email" name='email' id='email' className='form-control my-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}

          <label htmlFor="password">Password :</label>
          <input type="password" name='password' id='password' className='form-control my-2' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}

          {isLoading ? <button type='submit' className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> : <button className='btn bg-success text-white me-3'>Login</button>}
          <button onClick={goBack} className='btn bg-danger text-white my-2 ms-0'>Don't have an account yet?  Sign Up</button>

        </form>


      </div>

    </>
  )
}
