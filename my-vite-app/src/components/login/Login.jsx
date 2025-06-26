import { useState } from "react";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';

function Login() {
     const navigate = useNavigate();
    const [mail, SetMail] = useState("")
    const [password, SetPassword] = useState("")
    const submit=(e)=>{
e.preventDefault();
const logindata ={
mail,password
    };
       //set data to loclstorage
localStorage.setItem("logindata", JSON.stringify(logindata))
  //yippe data saved
      toast.success("Yipee! Data Saved")
  console.log("data saved!",submit)
   // Reset input fields after submission
   SetMail("");
   SetPassword("");
   setTimeout(()=>{
    navigate("/")
},1500)

    }

    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6  lg:px-5">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form method="POST">
                        <div className="flex items-center justify-between">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => SetMail(e.target.value)} type="mail" name="mail" id="email" required={true} value={mail} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => SetPassword(e.target.value)} type="password" name="password" id="password" required={true} value={password} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        

                        <div className="mt-3">
                            <button onClick={submit} type="button" className="py-3 px-5 bg-[#f2f1f1] rounded-xl hover:border-primary">Login</button>
                        </div>
                        <ToastContainer/>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Login;