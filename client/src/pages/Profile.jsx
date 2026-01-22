import React, { useEffect } from 'react'

export const Profile = () => {
  const token = localStorage.getItem("token");
  console.log(token, "token");
  
useEffect(async() =>{
   try {

      const res = await axios.get("http://localhost:3000/user", {
        headers:{ Authorization: `Bearer ${token}`}
      });

      
      console.log(res);

    } catch (error) {
      console.log(error.message);
    }
}, [])

  return (
    <div>Profile</div>
  )
}
