import axios from "axios";
import React, { useEffect, useState } from "react";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token, "token");
        const res = await axios.get("http://localhost:3000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        console.log(res);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);
console.log("user", user?.name);

  return (
<>

   {user ? (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}


</>
  )
};
