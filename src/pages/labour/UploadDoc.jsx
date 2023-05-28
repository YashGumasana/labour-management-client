import React, { useEffect, useState } from 'react'
import '../../styles/uploadDoc.css'
import { checkImage } from '../../utils/imageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { logout } from '../../redux/actions/authAction'
import { uploadDoc } from '../../redux/actions/Labour/labourDocAction'
import { Link, useNavigate } from 'react-router-dom'
import { documentName } from '../../common'


const UploadDoc = () => {

    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [documentPhoto, setDocumentPhoto] = useState(['', '', '', ''])


    const handleUploadProfile = (e, n) => {
        console.log("e.target.files.length", e.target.files.length);
        console.log("n", n);

        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            const photo = URL.createObjectURL(file)
            const err = checkImage(file)
            if (err) {
                return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
            }
            setDocumentPhoto(prevState => {
                const newState = [...prevState];
                newState[n] = file;
                return newState;
            })

            let preview = document.getElementById(`preview-${n}`);
            let imagePreview = document.getElementById(`file-ip-${n}-preview`);
            let imageLabel = document.querySelector(`.image-label-${n}`);
            let conatiner = document.querySelector(`.imageContainer-${n}`)

            // const imageLabel = document.querySelector(`.image-label-${n}`);
            imageLabel.innerText = `Upload ${documentName[n]}`;
            conatiner.style.display = "grid";
            conatiner.style.gridTemplateColumns = "1fr 1fr";

            preview.style.display = "flex";
            preview.style.backgroundColor = "#03012C";
            preview.style.width = "280px";
            preview.style.height = "200px";
            preview.style.borderRadius = "7px";
            preview.style.alignItems = "center";
            preview.style.justifyContent = "center";


            imageLabel.style.display = "flex";
            imageLabel.style.margin = "20px";
            imageLabel.style.alignItems = "center";
            imageLabel.style.justifyContent = "center";
            imageLabel.innerText = imageLabel.innerHTML.split(" ")[1]

            if (photo) {

                imagePreview.src = photo;
            }
            imagePreview.style.width = "75%";
            imagePreview.style.height = "75%";
            // imagePreview.style.border = "1px solid white";

            imagePreview.style.boxShadow = "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px";

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit");
        dispatch(uploadDoc({ documentPhoto, auth }))

    }

    useEffect(() => {
        if (alert.success === 'Document uploaded sucessfully') {
            navigate('/StatusCheck')
        }
    }, [alert.success, dispatch, navigate])


    return (
        <div>

            <div className='uploadDoc-heading'>
                <h1>Upload Document</h1>
                <div className='uploadDoc-rightSide'>
                    <Link className='register-link-small uploadDoc-signout' to="/" onClick={() => dispatch(logout())}>Sign out</Link>
                    <div className='uploadDoc-userInfo-container'>
                        <img src={auth.user.profilePhoto} alt="Person's name and description" />
                        <div className='uploadDoc-user-detail'>
                            <h2>Username : {auth.user.userName}</h2>
                            <p>UserId : {auth.user.userId}</p>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            {/* <p className='uploadDoc-middle-p'>Doc</p> */}
            <form className='uploadDoc-groupfile-btn' onSubmit={handleSubmit}>

                <div className='uploadDoc-group-input-file'>
                    <div className='uploadDoc-group-input-first-row'>
                        <div className='imageContainer-0 imageContainer uploadDoc-solo-file-container '>
                            <div id="img-input">
                                <label htmlFor="file-ip-0" className='image-label-0' id="image-label">Upload AadhaarCard</label>
                                <input type="file" id="file-ip-0" accept="image/*" name="file" onChange={(e) => handleUploadProfile(e, 0)} />
                            </div>
                            <div id="preview-0">
                                <img id="file-ip-0-preview" alt="img" />
                            </div>
                        </div>
                        <div className='imageContainer-1 imageContainer uploadDoc-solo-file-container'>
                            <div id="img-input">
                                <label htmlFor="file-ip-1" className='image-label-1' id="image-label">Upload AddressProof</label>
                                <input type="file" id="file-ip-1" accept="image/*" name="file" onChange={(e) => handleUploadProfile(e, 1)} />
                            </div>
                            <div id="preview-1">
                                <img id="file-ip-1-preview" alt="img" />
                            </div>
                        </div>
                    </div>
                    <div className='uploadDoc-group-input-second-row'>
                        <div className='imageContainer-2 imageContainer uploadDoc-solo-file-container'>
                            <div id="img-input">
                                <label htmlFor="file-ip-2" className="image-label-2" id="image-label">Upload BankDetails</label>
                                <input type="file" id="file-ip-2" accept="image/*" name="file" onChange={(e) => handleUploadProfile(e, 2)} />
                            </div>
                            <div id="preview-2">
                                <img id="file-ip-2-preview" alt="img" />
                            </div>
                        </div>
                        <div className='imageContainer-3 imageContainer uploadDoc-solo-file-container'>
                            <div id="img-input">
                                <label htmlFor="file-ip-3" className="image-label-3" id="image-label">Upload JobExperince</label>
                                <input type="file" id="file-ip-3" accept="image/*" name="file" onChange={(e) => handleUploadProfile(e, 3)} />
                            </div>
                            <div id="preview-3">
                                <img id="file-ip-3-preview" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
                <button type='submit' id='registerBtn' className='uploadDoc-submit-btn' style={{
                    display: "block", margin: "auto",
                    marginBottom: "11px",
                }}>Submit</button>

            </form>
        </div >

    )
}

export default UploadDoc
