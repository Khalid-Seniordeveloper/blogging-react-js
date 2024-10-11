import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// import { db } from '../../Configurations/Firebaseconfig';

import { auth, getAllData, getData } from '../../Configurations/Firebasemethods';
import HomeCard from '../../Components/Card/HomeCard';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    
    const [singleuserData , setsingleuserData] = useState([]);
    useEffect(() => {
          const alldatais = async()=>{
            try {
              
              const render = await getAllData("bloogs");
              allBlogs.push(render);
              setAllBlogs([...render])
              console.log(allBlogs);
              
            } catch (error) {

              console.error(error)
              
            }
          }


          alldatais();


    

     
      
   
      
        }, []);

   
      
    return (
        <>
            {allBlogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                allBlogs.map((item) => (
                    <div key={item.uid} style={{ marginBottom: '20px', width: '90%' }}>
                        <HomeCard
                            userImage={item.userImage || "https://via.placeholder.com/50"}
                            userName={item.userName}
                            postTime={item.postTime}
                            blogTitle={item.data}
                            blogDescription={item.description}
                            blogId={item.uid}
                        />
                    </div>
                ))
            )}
        </>
    );
   

};

export default Home;
