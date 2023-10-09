import React from "react";
import { useState } from "react";
import {
  AiFillEye,
  AiTwotoneEyeInvisible,
  AiOutlinePlus,
  AiFillLock,
  AiOutlineUnlock,
  AiOutlineMail,
} from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import classes from "./signup.module.css";
import { register } from "../../redux/authSlice";
import { request } from "../../util/fetchAPI";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

import {} from "react-icons/ai";

const Signup = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isStrength, setStrength] = useState("");
  const [isMistake, setMistake] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.type === "checkbox") {
      setIsAdmin(!isAdmin);
    }

    setMistake(null);
    let capsCount, smallCount, numberCount, symbolCount;
    if (username.length < 5) {
      setMistake("Username:Should be more than 5");
      setValid(false);
      return 0;
    } else if (/([a-zA-Z])\1{2,}/.test(username)) {
      setMistake("Username:Should not have consecutive repeated characters.");
      setValid(false);
      return;
    }

    if (!/^[a-zA-Z0-9._+-]+(\d+)?@[a-zA-Z]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setMistake("Email :Must be have @ ");
      setValid(false);
      return;
    } else {
      setMistake("Accepted");
      setValid(true);
    }

    if (password.length < 4) {
      setMistake(
        "Password:Must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &"
      );
      setValid(false);
      return;
    } else {
      capsCount = (password.match(/[A-Z]/g) || []).length;
      smallCount = (password.match(/[a-z]/g) || []).length;
      numberCount = (password.match(/[0-9]/g) || []).length;
      symbolCount = (password.match(/\W/g) || []).length;
      if (!capsCount) {
        setMistake("Password:Must contain one UPPERCASE letter");
        setValid(false);
        return;
      } else if (smallCount < 1) {
        setMistake("Password:Must contain one lowercase letter");
        setValid(false);
        return;
      } else if (numberCount < 1) {
        setMistake("Password:Must contain one number");
        setValid(false);
        return;
      } else if (symbolCount < 1) {
        setMistake("Password:Must contain one special character: @$! % * ? &");
        setValid(false);
        return;
      }
    }
    setTimeout(() => {
      setMistake(false);
    }, 5000);
  };
  console.log("outside", isAdmin);

  const dataHandler = async (childData) => {
    setStrength(childData);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleRegister = async (e, event) => {
    e.preventDefault();

    // how to check if ONLY ONE of the values of an object is empty
    if (Object.values(state).some((v) => v === "")) {
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 2500);
    }

    try {
      let filename = null;
      if (photo) {
        const formData = new FormData();
        filename = crypto.randomUUID() + photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);

        await fetch(`http://localhost:5000/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
      } else {
        setEmptyFields(true);
        setTimeout(() => {
          setEmptyFields(false);
        }, 2500);
        return;
      }

      const headers = {
        "Content-Type": "application/json",
      };

      const data = await request(`/auth/register`, "POST", headers, {
        ...state,
        profileImg: filename,
        isAdmin: isAdmin,
      });

      dispatch(register(data));
      if (isAdmin === true) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.photos}>
          <img src="./signUp.png" alt="" />
        </div>
        <div className={classes.signUpHandle}>
         {isAdmin?<h2>Admin Sign Up</h2> :<h2>User SignUp</h2> } 
          <form onSubmit={handleRegister}>
            <div className={classes.checkbox}>
              <label htmlFor="checkbox">{isAdmin? "Admin":("User")}</label>
              <input
                type="checkbox"
                id="checkbox"
                checked={isAdmin === true}
                style={{ display: "none" }}
                onChange={handleState}
              />
              <span className={classes.checkmark}></span>
            </div>

            <div className={classes.useName}>
              <input
                type="text"
                name="username"
                placeholder="Username..."
                onChange={handleState}
              />
              <span className={classes.iconsSignUPOne}>
                <BsPencilFill size="20px" />
              </span>
            </div>
            <div className={classes.uploadPhoto}>
              <label htmlFor="photo">Upload Photo +</label>
              <input
                style={{ display: "none" }}
                id="photo"
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {photo && <span className={classes.photoName}>{photo.name}</span>}
            </div>
            <div className={classes.emailBox}>
              <input
                type="text"
                name="email"
                placeholder="Email..."
                onChange={handleState}
              />
              <span className={classes.iconsSignUPTwo}>
                <AiOutlineMail />
              </span>
            </div>

            <div className={classes.toShow}>
              <div>
                <AiFillLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password.."
                onChange={handleState}
              />
              <span
                className={classes.visibility}
                style={{ color: "#117964;" }}
              >
                {" "}
                {showPassword ? (
                  <AiTwotoneEyeInvisible
                    color="green"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <AiFillEye onClick={togglePasswordVisibility} />
                )}
              </span>
            </div>
            <div className={classes.strength}>
              <PasswordStrengthMeter
                password={password}
                actions={dataHandler}
              />
            </div>
            {isStrength === "Hurrah-you-did -it" && valid === true && (
              <button className={classes.buttonSignup} type="submit">
                {" "}
                Register{" "}
              </button>
            )}
          </form>

          {error && (
            <div className={classes.error}>
              There was an error signing up! Try again.
            </div>
          )}

          {emptyFields && <div className={classes.error}>Fill all fields!</div>}
          <div className={classes.para}>
            {" "}
            <span>
              Already have an account? <Link to="/signIn">Login</Link>
            </span>
          </div>
        </div>
      </div>
     
      {isMistake !== null && isMistake && (
        <p
          className={
            isMistake !== null && valid === true && isMistake && isMistake
              ? classes.valid
              : classes.erode
          }
        >
          {" "}
          {isMistake}
        </p>
      )}
    </div>
  );
};

export default Signup;
