import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firestore";

function Login() {
    const navigate = useNavigate();
    const [mail, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin@!";

        if (mail === adminEmail && password === adminPassword) {
            const adminUser = {
                mail: adminEmail,
                password: adminPassword,
                isAdmin: true,
                loggedOut: false,
                first: "Admin",
                last: "User",
            };
            localStorage.setItem("userdata", JSON.stringify(adminUser));
            toast.success("Logged in as Admin");
            setTimeout(() => {
                navigate("/");
            }, 1500);
            return;
        }

        if (!mail || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const q = query(
                collection(db, "users"),
                where("mail", "==", mail),
                where("password", "==", password)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                // Add loggedOut = false
                const userToStore = { ...userData, loggedOut: false };

                localStorage.setItem("userdata", JSON.stringify(userToStore));
                toast.success("Login successful!");

                setTimeout(() => {
                    navigate("/profile");
                }, 1500);
            } else {
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong while logging in.");
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-5">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={submit} method="POST">
                    <div className="flex items-center justify-between">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            onChange={(e) => SetEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={mail}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Password
                        </label>
                    </div>
                    <div className="mt-2 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                            maxLength={10}
                            id="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-700 focus:outline-none"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="py-3 px-5 bg-[#f2f1f1] rounded-xl hover:border-primary">
                            Login
                        </button>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default Login;
