import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";


// https://www.youtube.com/watch?v=1rPs0tepOFU
// https://www.youtube.com/watch?v=7jOq6SXBF-k -- google auth
// MAKE SURE TO REFERENCE THE ABOVE


// TO DO: https://www.youtube.com/watch?v=GE27BkUZbXk - allow store of non-gmail users
// TO DO: error handling and error notifications



// login page that uses AuthContext for authentication
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result.user);
      if (result.user) {
        navigate("/dashboard");
      }
  });
};


  return (
    <section className="min-h-screen flex items-center font-inter justify-center bg-gradient-to-r from-green-100 from-10% via-blue-100 via-30% to-blue-100 to-90%">
      <div className="flex shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl">
          <h1 className="text-4xl font-bold">Welcome to Compass</h1>
          <div className="flex flex-col text-2xl text-left gap-1">
            <span className="font-inter">Username</span>
            <input type="text"placeholder="you@example.com" className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"></input>
          </div>
          <div className="flex flex-col text-2xl text-left gap-1">
            <span>Password</span>
            <input type="password" placeholder="Enter your password" className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"></input>
            <div className="flex gap-1 items-center ">
              <input type="checkbox" className="w-4 h-4"></input>
              <span className="text-base font-inter">Remember me</span>
            </div>
          </div>
          
        
          <button className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-10 rounded-md"
          // onClick={() => navigate("/dashboard")}> - has to be a valid already registered login on the db
            >Login</button>
            {/*<p className="continue-p">Continue with Google</p> */}
          <div className="items-center justify-center flex cursor-pointer"
          onClick={googleLogin}>
            <img src="../google.png" alt="Google Icon" width={"40%"}/>
          </div>
            <p className="font-semibold">Don't have an account? <a href="/register" className="text-blue-500 hover:text-green-500 hover:underline">Register</a>
            </p>
            
        </div>
        

        {/* Image section if you have time using <img> */}
      </div>
        
    </section>
  );
}