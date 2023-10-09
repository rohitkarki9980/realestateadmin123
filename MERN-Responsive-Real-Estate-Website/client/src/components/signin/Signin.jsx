import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link, } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { request } from "../../util/fetchAPI";
import classes from "./signin.module.css";

import {
  AiFillLock,
  AiOutlineUnlock,
  
} from "react-icons/ai";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 2500);
    }

    try {
      const options = {
        "Content-Type": "application/json",
      };

      const data = await request("/auth/login", "POST", options, {
        email,
        password,
      });

      dispatch(login(data));
    
     
        navigate("/");
    
       
      
       
      
    
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      console.error(error);
    }
  };
 

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
 <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className={classes.toShow}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

         
          <div className={classes.toShow}> 
          <label htmlFor="password" required>
            Password
          </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={classes.visibility} style={{ color: "#117964;" }}>
              {" "}
              {showPassword ? (
                <AiOutlineUnlock
                  color="white"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <AiFillLock onClick={togglePasswordVisibility} />
              )}
            </span>
          </div>
          <div  className={classes.buttonSignIn}>
            <button type="submit">
            Sign in
          </button>
          </div>
        
        </form>
    
        <div className={classes.para}>
          {" "}
          <p className={classes.signInP}>
            Already have an account? <Link to="/signup">Register</Link>
          </p>{" "}
        </div>
      </div>
      {error && (
          <div className={classes.error}>
            There was an error signing in! Wrong credentials or server error
          </div>
        )}
        {emptyFields && <div className={classes.error}>Fill all fields!</div>}
    </div>
  );
};

export default SignIn;
