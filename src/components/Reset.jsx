import React, { useState } from 'react'

/* Components */
import { CustomizeUi, globalFieldRules } from './Customize';
import Btn from "./Btn";
import Carousel from "./Carousel";
/* Images & Icons Below */
import logo from '../assets/icons/logo.svg';
import Redirectlink from "./Redirectlink";

import { isEmailAddress, isPasswordValid, isAlphabatic } from './helper/validator';
export default function Reset() {

    const [fieldDetail, setfieldDetail] = useState({
        emailError: false,
        passwordError: false,

        doesnotMatch: false,
        emailexist: false,

        emailValue: null,
        passwordValue: null,
        confirmPassword: null
    });


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
    const resetpassword = (e) => {
        e.preventDefault();
        var controllor = false;
        const { confirmPassword, passwordValue } = fieldDetail;

        if (confirmPassword !== passwordValue) {
            controllor = true;
            setfieldDetail({ ...fieldDetail, doesnotMatch: true })
        } else {
            controllor = false;
            setfieldDetail({ ...fieldDetail, doesnotMatch: false })
        }

        if (!controllor) {
            setfieldDetail({ ...fieldDetail, emailexist: true }) // if email exist in database
        }
    }
    const { emailError, passwordError, doesnotMatch, emailexist } = fieldDetail;
    let message = "Password must contain at least one numeric, lowercase letters, capital letters, special character and must be eight characters long";
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="fitprism__login">
                            <div className="d-flex justify-content-center">
                                <img src={logo} />
                            </div>
                            <h1 className="fw-bold fs-3 mt-2 mb-0 d-flex  text-uppercase"> Recover your password </h1>

                            <form onSubmit={resetpassword} className="mt-3">
                            {
                                emailexist && <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">e-mail does not exist</div>
                            }
                            <div className="mb-3">
                                <input type="email" className={globalFieldRules}
                                    id="fitPrism_email" placeholder="Email address" onBlur={emailHandler} aria-describedby="emailHelp" required />
                                {
                                    emailError && <div className="form-text text-danger text-lowercase animate__animated animate__shakeX">you have entered an invalid e-mail address.</div>
                                }
                            </div>

                            <div className="row animate__animated animate__backOutLeft">
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

                            <Btn type="submit" title="Reset Password" style={CustomizeUi.btn} />
                        </form>
                        <Redirectlink longtext="Already have an account?" pathAddress="/" pathTag="Login here" />
                    </div>
                </div>
                <Carousel />
            </div>
        </div>
        </React.Fragment >
    )
}
