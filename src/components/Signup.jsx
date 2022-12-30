import React, { useState } from 'react'
/* Components */
import { CustomizeUi, globalFieldRules } from './Customize';
import Btn from "./Btn";
import Carousel from "./Carousel";
/* Images & Icons Below */
import logo from '../assets/icons/logo.svg';
import Redirectlink from "./Redirectlink";
import { useDispatch } from 'react-redux';

import { isEmailAddress, isPasswordValid, isAlphabatic } from './helper/validator';
import { Navigate, useNavigate } from "react-router-dom";


export default function Signup() {
  // Qwe12#rf
  let Navigate = useNavigate();
  let message = "Password must contain at least one numeric, lowercase letters, capital letters, special character and must be eight characters long";

  const { btn, note } = CustomizeUi;
  const [fieldDetail, setfieldDetail] = useState({
    emailError: false,
    passwordError: false,
    nameError: false,
    doesnotMatch: false,
    emailexist: false,
    nameValue: null,
    emailValue: null,
    passwordValue: null,
    confirmPassword: null
  });

  const [success, setSuccess] = useState(false);
  const nameHandler = (e) => {
    const name = e.target.value.trim();
    if (name.length > 0) {
      if (!isAlphabatic(name)) {
        setfieldDetail({ ...fieldDetail, nameError: true });
      }
      else {
        setfieldDetail({ ...fieldDetail, nameError: false, nameValue: name })
      }
    } else {
      setfieldDetail({ ...fieldDetail, nameError: false });
    }
  }
  const emailHandler = (e) => {
    const email = e.target.value.trim();
    if (email.length > 0) {
      if (!isEmailAddress(email)) {
        setfieldDetail({ ...fieldDetail, emailError: true });
      }
      else {
        setfieldDetail({ ...fieldDetail, emailError: false, emailValue: email.toLowerCase() })
      }
    } else {
      setfieldDetail({ ...fieldDetail, emailError: false });
    }
  }
  const passwordHandler = (e) => {

    const password = e.target.value.trim();
    if (password.length > 0) {
      if (!isPasswordValid(password)) {
        setfieldDetail({ ...fieldDetail, passwordError: true });
      }
      else {
        setfieldDetail({ ...fieldDetail, passwordError: false, passwordValue: password })
      }
    } else {
      setfieldDetail({ ...fieldDetail, passwordError: false });
    }

  }
  const confirmHandler = (e) => {
    const confirm = e.target.value.trim();
    setfieldDetail({ ...fieldDetail, confirmPassword: confirm })
  }
  const submitSignup = (e) => {
    e.preventDefault();
    var controllor = false;
    const { confirmPassword, passwordValue } = fieldDetail;
    setfieldDetail({ ...fieldDetail, emailexist: false });
    if (confirmPassword !== passwordValue) {
      controllor = true;
      setfieldDetail({ ...fieldDetail, doesnotMatch: true })
    } else {
      controllor = false;
      setfieldDetail({ ...fieldDetail, doesnotMatch: false })
    }

    if (!controllor) {
      fetch("http://localhost:5000/api/auth/createUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: "Najeed ur Rehman",
          email: "info@najeedurrehman.com",
          password: "Qazwsxcd",
          confirmPassword: "Qazwsxcd"
        })
      }).then(response => response.json())
        .then(data => {
          const { success } = data;
          if (!success) {
            setfieldDetail({ ...fieldDetail, emailexist: true })
          } else {
            // console.log("Here");
            setSuccess(true);
            const { authtoken } = data;
            /* Re initalize State */
            localStorage.setItem('tokenformulaOne', authtoken);
            setTimeout(() => {
              Navigate("/");
            }, 5000);
          }
        });

    }
  }
  const { emailError, passwordError, nameError, doesnotMatch, emailexist } = fieldDetail;
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="fitprism__login">
              <div className="d-flex justify-content-center">
                <img src={logo} />
              </div>

              <h1 className="fw-bold fs-3 mt-2 mb-0 d-flex text-uppercase">become a member of <span
                className="ms-2 text-white" style={note}>fitprism </span> </h1>
              <span className="text-lowercase fs-6 fw-normal">fill the form carefully</span>
              {success && <div className="alert alert-success rounded-0 border-0 fw-bold" role="alert">
                Registeration successfully. Wait redirecting ...
              </div>
              }
              <form onSubmit={submitSignup} className="mt-3">
                {emailexist &&
                  <div className="alert alert-success rounded-0 border-0 fw-bold animate__animated animate__shakeX" role="alert">
                    E-mail already exist
                  </div>
                }
                <div className="mb-3">
                  <input type="text" onBlur={nameHandler} className={globalFieldRules}
                    id="" placeholder="Complete name" required />
                  {nameError && <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">please enter only alphabetical letters only.</div>}
                </div>

                <div className="mb-3">
                  <input type="email" className={globalFieldRules}
                    id="fitPrism_email" placeholder="Email address" onBlur={emailHandler} aria-describedby="emailHelp" required />
                  {
                    emailError && <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">you have entered an invalid e-mail address.</div>
                  }
                </div>

                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <input type="password"
                        className={globalFieldRules}
                        placeholder="Password" onBlur={passwordHandler} required />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <input type="password"
                        className={globalFieldRules}
                        placeholder="Confirm Password" onBlur={confirmHandler} required />
                    </div>
                  </div>
                </div>

                {
                  passwordError && <div className='mb-3' style={{ maxWidth: "480px" }}>
                    <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">{message}</div>
                  </div>
                }
                {
                  doesnotMatch && <div className='mb-3'>
                    <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">password does not match</div>
                  </div>
                }

                <Btn type="submit" title="Sign Up" style={btn} />
              </form>
              <Redirectlink longtext="Already have an account?" pathAddress="/" pathTag="Signin Here" />

            </div>
          </div>
          <Carousel />
        </div>
      </div>
    </React.Fragment >
  )
}