import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProver";

const Login = () => {
  const {signIn, googleSignin} = useContext(AuthContext)
  const handleLoggedIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    signIn(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user, 'successful;l')
      // ...
      form.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
  };

  const handleGoogleLogin = ()=>{
    googleSignin()
    .then((result) => {
      
      const user = result.user;
      console.log(user)
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLoggedIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <div className="mt-2 text-center">
                <button onClick={handleGoogleLogin} className="btn btn-xs btn-secondary">Login with Google</button>
              </div>
            <label className="label ml-6 mb-4">
              <Link to="/register" className="label-text-alt link link-hover">
                New to AuthMaster?
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
