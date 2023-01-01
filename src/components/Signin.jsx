import React, { useEffect, useState } from 'react'

/* Components */
import { CustomizeUi, globalFieldRules, forgetBtn } from './Customize';
import Btn from "./Btn";
import Carousel from "./Carousel";

/* Images & Icons Below */
import logo from '../assets/icons/logo.svg';
import Redirectlink from "./Redirectlink";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SIGNIN } from '../redux/commonExportor';

import { isEmailAddress, isPasswordValid } from './helper/validator';
import { Navigate, useNavigate } from "react-router-dom";

export default function Signin() {

    const dispatch = useDispatch();
    const naviate = useNavigate();
    const { note, btn, checkbox_label, checkbox_login, checkbox_checked } = CustomizeUi;
    const [checkedRule, setCheckedRule] = useState(CustomizeUi.checkbox_login);
    const [checked, setChecked] = useState(false);
    const checkedHandler = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        const ruleChange = checked ? checkbox_checked : checkbox_login;
        setCheckedRule(ruleChange);
    }, [checked]);

    const [fieldDetail, setfieldDetail] = useState({
        emailError: false,
        passwordError: false,
        emailValue: null,
        passwordValue: null,
        invalidError: false
    });
    const [success, setSuccess] = useState(false);
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
        setfieldDetail({ ...fieldDetail, passwordValue: password })
    }
    //Qwert!@345
    const submitSignin = (event) => {
        event.preventDefault();
        const { emailValue, passwordValue } = fieldDetail;
        if (emailValue !== null && passwordValue !== null) {
            fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                })
            }).then(response => response.json())
                .then(data => {
                    const {success}= data;             
                    if ( success ){
                        localStorage.clear();
                        localStorage.setItem('userT', data.authtoken);
                        setfieldDetail({ ...fieldDetail, invalidError: false })
                        setSuccess(true);
                        setTimeout(() => {
                            dispatch(SIGNIN())
                        }, 3000);
                    }
                    else{
                        setfieldDetail({ ...fieldDetail, invalidError: true })
                    }
                })
        }
    }
    const { emailError, passwordError, invalidError } = fieldDetail;
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="fitprism__login">
                            <div className="d-flex justify-content-center">
                                <img src={logo} />
                            </div>

                            <h1 className="fw-bold fs-3 mt-2 mb-0 d-flex text-uppercase"> welcome back to <span
                                className="ms-2 text-white" style={note}>fitprism </span> </h1>
                            <span className="text-lowercase fs-6 fw-normal">please Enter your details</span>

                            {
                                success && <div className="alert alert-success rounded-0 border-0 fw-bold" role="alert">
                                    Login successfully. Wait redirecting ...
                                </div>
                            }

                            {invalidError && <div className="alert alert-danger rounded-0 border-0 fw-bold" role="alert">
                                Login Failed. Password or E-mail wrong
                            </div>
                            }
                            <form onSubmit={submitSignin} className="mt-3">
                                <div className="mb-3">
                                    <input type="email" className={globalFieldRules}
                                        id="fitPrism_email" placeholder="Email address" aria-describedby="emailHelp" onBlur={emailHandler} required />
                                    {
                                        emailError && <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">you have entered an invalid e-mail address.</div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <input type="password" onChange={passwordHandler} className={globalFieldRules} placeholder="Password" required />
                                    {
                                        passwordError && <div className="form-text text-danger text-lowercase" style={{ maxWidth: "425px" }}>Password must contain at least one numeric, lowercase letters, capital letters, special character and must be eight characters long</div>
                                    }
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input rounded-0 shadow-none" style={checkedRule} id="keep_me_login" onBlur={checkedHandler} />
                                    <label className="form-check-label" style={checkbox_label} htmlFor="keep_me_login">Login me for 30 days</label>
                                </div>
                                <Btn type="submit" title="Login" style={btn} />
                            </form>
                            <Redirectlink longtext="Become a member?" pathAddress="/become-a-member" pathTag="Signup Here" />
                            <Link to='/lost-password' className=' text-decoration-none fw-semibold  px-1 py-1' style={forgetBtn}>Forget password?</Link>
                        </div>
                    </div>
                    <Carousel />
                </div>
            </div>
        </React.Fragment >
    )
}