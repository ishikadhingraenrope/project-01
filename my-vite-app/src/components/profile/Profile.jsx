import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
 function Profile(){
    const [user,SetUser ] = useState(null)
    const navigate = useNavigate();
// load user data from localstorage on component mount

useEffect(()=>{
    const storedUser = localStorage.getItem("userdata");
    if(storedUser){
        SetUser(JSON.parse(storedUser));
    }
},[])

const handleLogout=()=>{
    localStorage.removeItem("userdata");
    SetUser(null);
    navigate("/signup");
}
  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">No user logged in</h2>
      </div>
    );
  }

    return(
        <>
      <div className="p-5 border rounded shadow-md max-w-md mx-auto mt-10 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.first}!</h2>
      <h3>You are Logged In</h3>
     


  <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 "
      >
        Logout
      </button>
        </div>
        
        
        </>
    )
 }
 export default Profile;