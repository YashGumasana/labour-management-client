import React, { useState } from 'react'
import { AiTwotoneEye, AiTwotoneEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { feedback_for_labour_by_contractor } from '../../redux/actions/Contractor/contractor'

const Feedback = () => {

    const initialState = { userId: '', tenure: '', remark: '' }
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()

    const [feedBackData, setFeedBackDataData] = useState(initialState)
    const { userId, tenure, remark } = feedBackData



    const handleChangeInput = e => {
        const { name, value } = e.target
        setFeedBackDataData({ ...feedBackData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(feedback_for_labour_by_contractor({ feedBackData, auth }))
        setFeedBackDataData(initialState);

    }




    return (
        <div className='loginPage'>
            <form className='login-form' onSubmit={handleSubmit} >
                <h1 className='title'>
                    Feedback
                </h1>

                <div className='email-group'>

                    <input type="text" id='inputEmail' className='inputLogin' name='userId' placeholder="UserId" autoComplete="none" onChange={handleChangeInput} value={userId} />
                </div>
                <div className='email-group'>
                    <input type="text" id='inputEmail' className='inputLogin' name='tenure' placeholder="Tenure" autoComplete="none" onChange={handleChangeInput} value={tenure} />
                </div>
                <div className='email-group'>
                    <input type="text" id='inputEmail' className='inputLogin' name='remark' placeholder="Remark" autoComplete="none" onChange={handleChangeInput} value={remark} />
                </div>


                {/* <div className='password-group'>
                  
                    <input type={showPassword ? 'text' : 'password'} id='inputPassword' className='inputLogin' name='password' placeholder='password' autoComplete="none" onChange={handleChangeInput} value={password} />
                    <Button className='toggleBtn' variant="outline-white" onClick={togglePassword}>
                        {showPassword ? <AiTwotoneEyeInvisible className="BiHide" /> : <AiTwotoneEye className="BiShow" />}
                    </Button>
                </div> */}


                <button type='submit' id='loginBtn' style={{ marginBottom: "20px" }}>Submit</button>
                {/* <p className="my-2 p-3 register-link">
                    Don't have an account? <Link to="/register" className='register-link-small'>Register</Link>
                </p> */}

            </form>
        </div>
    )
}

export default Feedback