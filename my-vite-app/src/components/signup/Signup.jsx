import { useState, useEffect } from "react";
  import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();

    const [first, SetFirst] = useState("")
    const [last, SetLast] = useState("")
    const [number, SetNumber] = useState("")
    const [gender, SetGender] = useState("")
    const [age, SetAge] = useState("")
const [disable, SetDisable] = useState(true)
useEffect(()=>{
if(first && last && number && gender && age){
    SetDisable(false)
}else{
    SetDisable(true)
}
},[first,last,number,gender,age])

const handleButton=(e)=>{
setTimeout(()=>{
    e.preventDefault();// prevent page reloads
    const userdata={
first,last,number,gender,age
    };
    //set data to loclstorage
    localStorage.setItem("userdata", JSON.stringify(userdata))
    //yippe data saved
      toast.success("Yipee! Data Saved")
  console.log("data saved!",userdata)
   // Reset input fields after submission
     SetFirst("");
     SetLast("");
     SetGender("");
     SetNumber("");
     SetAge("");
setTimeout(()=>{
    navigate("/")
},1500)


},500)

}
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6  lg:px-5">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form method="POST">

                        <div className="flex items-center justify-between">
                            <label htmlhtmlFor="first" className="block text-sm/6 font-medium text-gray-900">
                                First Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e)=> SetFirst(e.target.value)} type="text" name="firstname" id="first" required={true} value={first} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="last" className="block text-sm/6 font-medium text-gray-900">
                                Last Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e)=> SetLast(e.target.value)}  type="text" name="lastname" required={true} id="last" value={last} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <label htmlFor="male" className="block text-sm/6 font-medium text-gray-900">Choose your Gender</label>

                        </div>
                        <div className=" flex items-center justify-between mt-5">
          <input  onChange={(e)=>SetGender(e.target.value)} checked={gender === "male"} type="radio" name="gender" id="male" value="male"  required />
          <label htmlFor="male" className="block text-sm/6 font-medium text-gray-900">Male </label><br/>
          <input  onChange={(e)=>SetGender(e.target.value)} checked={gender === "female"}  type="radio" name="gender" id="female" value="female"  required />
          <label htmlFor="female" className="block text-sm/6 font-medium text-gray-900">Female</label><br/>

          
          <input  onChange={(e)=>SetGender(e.target.value)} checked={gender === "transgender"} type="radio" name="gender" id="transgender" value="transgender" required />
          <label htmlFor="transgender" className="block text-sm/6 font-medium text-gray-900">Transgender</label><br/>

        </div>

<div className="flex items-center justify-between mt-5">
        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">Enter Your Phone Number</label>
        </div>
  <div className="mt-2">
        <input onChange={(e)=>SetNumber(e.target.value)} type="tel"  value={number} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id="phone" name="phone"  required placeholder="123-393-5874" />        </div>

<div className="flex items-center justify-between mt-5">
        <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900">Enter Your Age</label>
        </div>
        <div className="mt-5">
        <input onChange={(e)=>SetAge(e.target.value)} value={age} type="text" id="age" name="age"   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"  />

           </div>


           <div className="m-5">
            <button onClick={handleButton} disabled={disable} type="button" 
            style={{color: disable ? "red" : "green"}} className="py-3 px-5 bg-[#f2f1f1] rounded-xl hover:border-primary">
                Sign Up
            </button>
            
           </div>
                   
                    </form>
                     <ToastContainer />
                </div>

            </div>
        </>
    )
}
export default Signup;