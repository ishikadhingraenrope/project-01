import { useState } from "react";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function Login() {
     const navigate = useNavigate();
        const[mail,SetEmail] = useState("") 
    const[password, SetPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const submit=(e)=>{
e.preventDefault();
 const savedUser = JSON.parse(localStorage.getItem("userdata"));

    if (!savedUser) {
      toast.error("No user found. Please sign up first.");
      return;
    }

    if (mail === savedUser.mail && password === savedUser.password) {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/profile"); // redirect to homepage/dashboard
      }, 1500);
    } else {
      toast.error("Invalid credentials!");
    }
  };


    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6  lg:px-5">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={submit} method="POST">
                        <div className="flex items-center justify-between">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => SetEmail(e.target.value)} type="mail" name="mail" id="email" required={true} value={mail} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            </div>
                            <div className="mt-2 relative">
<input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => {
      const filtered = e.target.value.replace(/\d/g, "");
      SetPassword(filtered);
                            }}  maxLength={10}   id="password" name="password" placeholder="Enter Your Password " className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                            
                            />
                            <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute  right-3 top-[1/2] transform -translate-y-1/2 text-xl text-gray-700 focus:outline-none"
  >
    {showPassword ?<FaEye />  : <FaEyeSlash />}
  </button>                            </div>
                        

                        <div className="mt-3">
                            <button  type="submit" className="py-3 px-5 bg-[#f2f1f1] rounded-xl hover:border-primary">Login</button>
                        </div>
                        <ToastContainer/>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Login;