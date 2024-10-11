import React, { useEffect, useState } from 'react'
import { auth, db, getData, sendData } from '../../Configurations/Firebasemethods'
import { useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { onAuthStateChanged } from 'firebase/auth'
import BlogCard from '../../Components/Card/BlogCard'
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { deleteDoc } from 'firebase/firestore/lite'



const Dashboard = ({ blogs }) => {


  const [blog , setblog] = useState ([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        try {
          const singleuserdata = await getData("bloogs", user.uid); // Use existing getData function
          console.log(singleuserdata);
          setblog(singleuserdata); 
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Optional: Handle case where user is not logged in
        console.log("No user is logged in");
        setblog(null); // Clear blog data if no user
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


 


const sendingdata = async(data) =>{
console.log(data);


try {

  const blogSend = await sendData({

     data : data.title ,
     description : data.description ,
     uid : auth.currentUser.uid

  } , "bloogs")
  blog.push({
    title : data.title,
    description : data.description ,
    uid : auth.currentUser.uid
  })
  setblog([...blog])

  console.log(blogSend);
  
  

} catch (error) {
  console.error(error)
}
}



return (
  <>
    <div className="flex justify-center items-center min-h-screen p-4">
      <form onSubmit={handleSubmit(sendingdata)} className="bg-white shadow-md rounded px-8 py-6 w-full max-w-lg">
        <h2 className="text-2xl mb-4 text-center">Add Blog</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Blog Title"
            className={`input input-bordered input-info w-full`}
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="What's on your mind?"
            className={`input input-bordered input-info w-full`}
            {...register("description", { required: true })}
          />
          {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
        </div>

        <button className="btn btn-info">Submit</button>
      </form>
    </div>

    <div className="flex flex-col items-center">
   

{blog.map((item) => (
    <div key={item.uid} style={{ marginBottom: '20px', width: '90%' }}>
        <BlogCard
            userImage={item.userImage || "https://via.placeholder.com/50"}
            userName={item.userName} // Add this line
            postTime={item.postTime}
            blogTitle={item.data}
            blogDescription={item.description}
            blogId={item.uid} // Assuming you might want to use the uid for deletion
        />
    </div>
))}



  
    </div>

  </>
);
};

export default Dashboard;