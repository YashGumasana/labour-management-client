import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { genderStatus, userStatus } from '../common'
import { register } from '../redux/actions/authAction'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { checkImage } from '../utils/imageUpload'
import { AiTwotoneEyeInvisible, AiTwotoneEye } from 'react-icons/ai';
import { Button } from 'react-bootstrap';


const Register = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        userName: '', fullName: '', email: '',
        phoneNumber: '', password: '', confirmPassword: '', profilePhoto: '', category: 0, gender: 0
    }

    const [userData, setUserData] = useState(initialState)


    // const [typePass, setTypePass] = useState(false)
    // const [typeCfPass, setTypeCfPass] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleCfPassword = () => {
        setShowCfPassword(!showCfPassword);
    };
    const [profile, setProfile] = useState('')

    const { userName, fullName, email, phoneNumber, password, confirmPassword, gender } = userData



    const handleUploadProfile = (e) => {


        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            const photo = URL.createObjectURL(file)
            const err = checkImage(file)
            if (err) {
                return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
            }
            setProfile(file)
            const preview = document.getElementById("preview")
            let imagePreview = document.getElementById("file-ip-1-preview");
            let imgContainer = document.querySelector(".imageContainer");
            let imageLabel = document.getElementById("image-label");

            // preview
            preview.style.display = "flex";
            preview.style.gridColumn = "2";
            preview.style.gridRow = "2 / 5";
            preview.style.backgroundColor = "white";
            preview.style.width = "450px";
            preview.style.marginLeft = "15px";
            preview.style.borderRadius = "7px";
            preview.style.justifyContent = "center";


            if (photo) {

                imagePreview.src = photo;
            }
            // imagePreview.style.position = "absolute";
            imagePreview.style.width = "125px";
            imagePreview.style.height = "100%";
            imagePreview.style.objectFit = "cover"
            // imagePreview.style.fitSi


            imgContainer.style.gridRow = "1";
            imgContainer.style.gridColumn = "2";

            imageLabel.style.paddingTop = "10px";
            imageLabel.style.paddingBottom = "10px";
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        // categoryField.v
        if (name === 'gender') {
            const genderId = genderStatus[value]
            setUserData({ ...userData, gender: genderId })
        }
        else if (name === 'category') {
            const categoryId = userStatus[value]
            setUserData({ ...userData, category: categoryId })
        }
        else {
            setUserData({ ...userData, [name]: value })
        }
    }

    useEffect(() => {
        if (alert.success) {
            console.log('navigate to login');
            navigate('/');
        }
    }, [alert.success, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(register({ userData, profile }))

    }


    return (
        <div className='container1'>
            <h1 className='text-center text-white'>Network</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder='UserName' autoComplete="none" name='userName' id='name' onChange={handleChangeInput} value={userName} />
                </div>
                <div className='imageContainer'>
                    <div id="img-input">
                        <label htmlFor="file-ip-1" id="image-label">Upload Profile</label>
                        <input type="file" id="file-ip-1" accept="image/*" name="file" onChange={handleUploadProfile} />
                    </div>
                </div>
                <div id="preview">
                    <img id="file-ip-1-preview" alt="img" />
                </div>
                <div>
                    <input type="text" id="fullName" name="fullName" autoComplete="none" placeholder="FullName" onChange={handleChangeInput} value={fullName} />
                </div>
                <div>
                    <input type="email" id="email" name="email" autoComplete="none" placeholder="Email" onChange={handleChangeInput} value={email} />
                </div>
                <div>
                    <input type="text" id="phoneNumber" name="phoneNumber" autoComplete="none" placeholder="PhoneNumber" onChange={handleChangeInput} value={phoneNumber} />
                </div>
                <div className='passwordTogel'>
                    <input type={showPassword ? 'text' : 'password'} id="password" name="password" autoComplete="none" placeholder="Password" onChange={handleChangeInput} value={password} />

                    <Button className='toggleBtn' variant="outline-white" onClick={togglePassword}>
                        {showPassword ? <AiTwotoneEyeInvisible className="BiHide" /> : <AiTwotoneEye className="BiShow" />}
                    </Button>
                </div>

                <div id="input-box">
                    <label className="category1" htmlFor="category">Choose a Category : </label>
                    <br />
                    <select className="select" name="category" id="category" value={Object.keys(userStatus).find(
                        (key) => userStatus[key] === userData.category
                    )} onChange={handleChangeInput}>
                        <option value="labour">Labour</option>
                        <option value="contractor">Contractor</option>
                        <option value="officer">Officer</option>
                        {/* <option value="builder">Builder</option> */}
                    </select>
                </div>


                <div className='passwordTogel'>
                    <input type={showCfPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" autoComplete="none"
                        placeholder="Confirm Password" onChange={handleChangeInput} value={confirmPassword} />
                    <Button className='toggleBtn' variant="outline-white" onClick={toggleCfPassword}>
                        {showCfPassword ? <AiTwotoneEyeInvisible className="BiHide" /> : <AiTwotoneEye className="BiShow" />}
                    </Button>
                </div>

                <div className="gender-details">
                    <h3>
                        <center className="genderName">Gender :</center>
                    </h3>
                    <div className="gender1">
                        <input type="radio" name="gender" id="dot-1" value="Male" checked={gender === 0} onChange={handleChangeInput} />
                        <label htmlFor="dot-1">Male
                            {/* <span className="dot one"></span> */}
                            {/* <span className="gender">Male</span> */}
                        </label>
                    </div>
                    <div className="gender2">

                        <input type="radio" name="gender" id="dot-2" value="Female" onChange={handleChangeInput} />
                        <label htmlFor="dot-2">
                            Female
                        </label>

                    </div>
                </div>
                <div className='action-button'>
                    <button type='submit' id='registerBtn'>Register</button>
                    <p className="my-2 register-link">
                        Already have an account? <Link to="/" className='register-link-small'>Login</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register
