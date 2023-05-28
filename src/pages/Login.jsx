import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { AiTwotoneEyeInvisible, AiTwotoneEye } from 'react-icons/ai';

import { GLOBALTYPES } from '../redux/actions/globalTypes'

const Login = () => {

    const initialState = { userId: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { userId, password } = userData

    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
            }
        })
        if (auth.token) {
            nevigate('/')
        }
    }, [auth.token, nevigate, dispatch, alert.category])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData, alert.category))
    }


    return (
        <div className='loginPage'>
            <form className='login-form' onSubmit={handleSubmit} >
                <h1 className='title'>
                    Network
                </h1>

                <div className='email-group'>
                    {/* <label htmlFor="inputEmail">Email address</label> */}
                    <input type="text" id='inputEmail' className='inputLogin' name='userId' placeholder="UserId" autoComplete="none" onChange={handleChangeInput} value={userId} />
                    {/* 
                <small id='emailHelp'>
                    we'll never share your email with anyone else.
                </small> */}
                </div>

                <div className='password-group'>
                    {/* <label htmlFor="inputPassword"></label> */}
                    <input type={showPassword ? 'text' : 'password'} id='inputPassword' className='inputLogin' name='password' placeholder='password' autoComplete="none" onChange={handleChangeInput} value={password} />
                    <Button className='toggleBtn' variant="outline-white" onClick={togglePassword}>
                        {showPassword ? <AiTwotoneEyeInvisible className="BiHide" /> : <AiTwotoneEye className="BiShow" />}
                    </Button>
                    {/* <small>Hide</small> */}
                </div>


                <button type='submit' id='loginBtn'>Login</button>
                <p className="my-2 p-3 register-link">
                    Don't have an account? <Link to="/register" className='register-link-small'>Register</Link>
                </p>

            </form>
        </div>
    )
}

export default Login
