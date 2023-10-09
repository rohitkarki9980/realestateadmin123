import React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = (props) => {
  const testedResult = props.password;
  const createPasswordLabel = () => {
    let score = 0
    let regexPositive = ["[A-Z]","[a-z]","[0-9]","\\W",]
    regexPositive.forEach((regex, index) => {
      if (new RegExp(regex).test(testedResult)) {
        score +=1
      }
    })
    switch (score) {
      case 0:
        return ({
          value: 0,
          info: "",
        });
      case 1:
        return ({
          value: 1,
          info: "So-much-to-do",
        });
      case 2:
        return ({
          value: 2,
          info: "Go-On",
        });
      case 3:
        return ({
          value: 3,
          info: "One-more-step",
        });
      case 4:
        return ({
          value: 4,
          info: "Hurrah-you-did -it",
        });
      default:
        return null
    }
  }
// Step 1: Invoke the createPasswordLabel() function to get its result.
const passwordLabelResult = createPasswordLabel();

// Step 2: Access the 'info' property from the result obtained in Step 1.
const info = passwordLabelResult.info;

// Step 3: Call the 'props.actions' function with the 'info' value obtained in Step 2.
props.actions(info);

  return (<>
    <div className="password-strength-meter">
      <progress className={`password-strength-meter-progress strength-${createPasswordLabel().info}`} value={createPasswordLabel().value} max="4" />
      <br />
      <p className="password-strength-meter-label">
        {props.password && ( <>
          <div className={`password__label strength-${createPasswordLabel().info}`}>Password strength: <span>{createPasswordLabel().info} </span></div> 
        </>)}
      </p>
    </div>
  </>
   )
  }
export default PasswordStrengthMeter;