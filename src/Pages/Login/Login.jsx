import React, { useRef } from 'react'
import { auth, getData, loginUser } from '../../Configurations/Firebasemethods'
import { useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Login = () => {


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  
const navigate = useNavigate();

const loggedinUser = async (data) => {


  console.log(data)
  try {
    const userLogin = await loginUser({
      email: data.email,
      password: data.password,
      name : data.name
    })
    console.log(userLogin)
    console.log("login hy pasha");
    
     navigate('/')

  } catch (error) {
    console.error(error)
  }
}

  
  
  return (

    <>
    <form onSubmit={handleSubmit(loggedinUser)}>
  
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px", // Max width for larger screens
          gap: '20px'
        }}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" {...register("email", { required: true })} />
            <br />
            {errors.email && <span>This field is required</span>}
          </label>
  
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" placeholder="Password" {...register("password", { required: true })} />
            <br />
            {errors.password && <span>This field is required</span>}
          </label>
          <button className="btn btn-info" type='submit'>Login</button>

          <h3><Link to="/register">Not a user?</Link></h3>
        </div>
      </div>
  
      <style jsx>{`
        @media (max-width: 600px) {
          .input {
            width: 100%; // Full width on smaller screens
          }
        }
      `}</style>
    </form>
  </>

  )
}

export default Login