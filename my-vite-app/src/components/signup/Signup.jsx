import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
function Signup() {
    const navigate = useNavigate();

    const [first, SetFirst] = useState("")
    const [last, SetLast] = useState("")
    const [number, SetNumber] = useState("")
    const [gender, SetGender] = useState("")
    const [age, SetAge] = useState("") 
    const[mail,SetEmail] = useState("") 
    const[password, SetPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const [disable, SetDisable] = useState(true)

    useEffect(() => {
        if (first && last && number && gender && age && mail && password) {
            SetDisable(false)
        } else {
            SetDisable(true)
        }
    }, [first, last, number, gender, age, mail, password])

  const handleButton = (e) => {
  e.preventDefault();

  if (!first.trim()) {
    toast.error("First name is required");
    return;
  }

  if (!last.trim()) {
    toast.error("Last name is required");
    return;
  }

  if (!gender) {
    toast.error("Gender is required");
    return;
  }

  if (!number.trim()) {
    toast.error("Phone number is required");
    return;
  }

  if (!age.trim()) {
    toast.error("Age is required");
    return;
  }

  if (!mail.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!password.trim()) {
    toast.error("Password is required");
    return;
  }

  if (number.length !== 10) {
    toast.error("Phone number must be exactly 10 digits");
    return;
  }

  if (Number(age) < 1 || Number(age) > 100) {
    toast.error("Age must be between 1 and 100");
    return;
  }

  if (!/^[A-Za-z!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`|\\]+$/.test(password)) {
    toast.error("Password must contain only alphabets and special characters");
    return;
  }

  const userdata = { first, last, number, gender, age, mail, password, loggedOut: false };
  localStorage.setItem("userdata", JSON.stringify(userdata));
  toast.success("Yipee! Data Saved");

  // Clear fields
  SetFirst("");
  SetLast("");
  SetGender("");
  SetNumber("");
  SetAge("");
  SetEmail("");
  SetPassword("");

  setTimeout(() => {
    navigate("/login");
  }, 1500);
};
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6  lg:px-5">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleButton} method="POST">

                        <div className="flex items-center justify-between">
                            <label htmlFor="first" className="block text-sm/6 font-medium text-gray-900">
                                First Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => SetFirst(e.target.value)} type="text" name="firstname" id="first"  value={first} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="last" className="block text-sm/6 font-medium text-gray-900">
                                Last Name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => SetLast(e.target.value)} type="text" name="lastname"  id="last" value={last} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <label htmlFor="male" className="block text-sm/6 font-medium text-gray-900">Choose your Gender</label>

                        </div>
                        <div className=" flex items-center justify-between mt-5">
                            <input onChange={(e) => SetGender(e.target.value)} checked={gender === "male"} type="radio" name="gender" id="male" value="male" />
                            <label htmlFor="male" className="block text-sm/6 font-medium text-gray-900">Male </label><br />
                            <input onChange={(e) => SetGender(e.target.value)} checked={gender === "female"} type="radio" name="gender" id="female" value="female"  />
                            <label htmlFor="female" className="block text-sm/6 font-medium text-gray-900">Female</label><br />


                            <input onChange={(e) => SetGender(e.target.value)} checked={gender === "transgender"} type="radio" name="gender" id="transgender" value="transgender"  />
                            <label htmlFor="transgender" className="block text-sm/6 font-medium text-gray-900">Transgender</label><br />

                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">Enter Your Phone Number</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, ""); // Remove all non-digits
                                if (input.length <= 10) {
                                    SetNumber(input);
                                }
                            }} type="tel" maxLength={10} inputMode="numeric" title="Enter a 10 Digit Number" value={number} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id="phone" name="phone"  placeholder="1234567890" />        </div>

                        <div className="flex items-center justify-between mt-5">
                            <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900">Enter Your Age</label>
                        </div>
                        <div className="mt-5">
                            <input onChange={(e) => {const input = e.target.value.replace(/\D/g, ""); // Remove all non-digits
                              if(Number(input)<=100){
                            SetAge(input);
                              }
                                  
                                }} value={age} type="text" id="age" name="age" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                        </div>

                       <div className="flex items-center justify-between mt-5">
                            <label htmlFor="mail" className="block text-sm/6 font-medium text-gray-900">Enter Your Email</label>
                        </div>
                       <div className="mt-5">
                            <input onChange={(e) => SetEmail(e.target.value)}  value={mail} type="email" id="mail" name="mail" placeholder="example@.com" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                        </div>
                        
                         <div className="flex items-center justify-between mt-5">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Enter Your Password</label>
                        </div>
                                  <div className="mt-5 relative">
                             
                             <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => {
      const filtered = e.target.value.replace(/\d/g, "");
      SetPassword(filtered);
                            }}  maxLength={10}   id="password" name="password" placeholder="Enter Your Password " className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                            
                            />
                            <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 focus:outline-none"
  >
    {showPassword ?<FaEye />  : <FaEyeSlash />}
  </button>

                                 
                        </div>
                        <div className="m-5 ">
                            <button  type="submit"
                                style={{backgroundColor: disable ? "red" : "green" }}   className="py-3 px-5 rounded-xl text-white cursor-pointer">
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