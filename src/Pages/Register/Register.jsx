import React, { useRef } from "react"
import { auth, uploadImage } from "../../Configurations/Firebasemethods"
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Configurations/Firebaseconfig";
const Register = () => {
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const profileImage = useRef()

  let signUpUser = (obj) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, obj.email, obj.password)
            .then(async (res) => {
                const userId = res.user.uid; // Get the user's UID
                obj.id = userId; // Set the ID in the object
                delete obj.password; // Remove the password

                // Save the user data to Firestore
                try {
                    await addDoc(collection(db, "users"), obj);
                    console.log("User added to database successfully:", obj);
                    resolve(userId); // Resolve with the user's UID
                } catch (err) {
                    console.error("Error adding user to database:", err);
                    reject(err.message);
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};


  const loginUserFromFirebase = async (event) => {
    event.preventDefault()
    console.log(email.current.value)
    console.log(password.current.value)
    console.log(fullName.current.value)
    console.log(profileImage.current.files[0])

    const userProfileImageUrl = await uploadImage(profileImage.current.files[0], email.current.value)

    try {
      const userData = await signUpUser({
        email: email.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
        profileImage: userProfileImageUrl
      })
      console.log(userData);

    } catch (error) {
      console.error(error);

    }

  }
  return (
<div>

  <form onSubmit={loginUserFromFirebase}>

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
        maxWidth: "400px", // Set a max width for larger screens
        gap: '20px',
      }}>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Username" ref={fullName} />
        </label>

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
          <input type="text" className="grow" placeholder="Email" ref={email} />
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
          <input type="password" className="grow" placeholder="Password" ref={password} />
        </label>

        <input type="file" className="file-input file-input-bordered file-input-info w-full" ref={profileImage} />

        <button className="btn btn-info" type='submit'>Register</button>
        <h3><Link to="/login">Already a user?</Link></h3>
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
</div>

  )
}

export default Register