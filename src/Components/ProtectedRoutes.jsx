import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Configurations/Firebasemethods';

const ProtectedRoutes = ({component}) => {

    const [isuser , setisuser] = useState(false);
const navigate = useNavigate()
 useEffect ( ()=>{


    onAuthStateChanged (auth , (user)=>{

        if (user){
            setisuser(true)
            return;
        } else {
            navigate('/login')
        }

    })



  }, [])

  return (
    isuser ? component : <h1>Loading ...</h1>
  )
}

export default ProtectedRoutes