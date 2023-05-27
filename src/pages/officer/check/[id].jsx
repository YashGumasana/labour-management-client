import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLabourDocs, updateDocStatus } from '../../../redux/actions/Officer/labourDetailAction'
import Loading from '../../../components/alert/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { documentStatus } from '../../../common'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'


const Check = () => {

    console.log("check page");
    const { auth, officer, alert } = useSelector(state => state);
    const { id } = useParams();
    const navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("getLabourDocs----------------------------------------------------");
        if (id) {
            dispatch(getLabourDocs({ id, auth }));
        }
    }, [dispatch, id, auth]);

    const [docStatus, setDocStatus] = useState([0, 0, 0, 0]);

    const handleApprove = (index) => {
        const newDocStatus = [...docStatus];
        newDocStatus[index] = documentStatus['approved'];
        setDocStatus(newDocStatus);
        const approveButtons = document.querySelectorAll('.offficerCheck-approve-button');
        const rejectButtons = document.querySelectorAll('.offficerCheck-reject-button');
        approveButtons[index].classList.add('selected');
        rejectButtons[index].classList.remove('selected');
    };

    const handleReject = (index) => {
        const newDocStatus = [...docStatus];
        newDocStatus[index] = documentStatus['rejected'];
        setDocStatus(newDocStatus);
        const approveButtons = document.querySelectorAll('.offficerCheck-approve-button');
        const rejectButtons = document.querySelectorAll('.offficerCheck-reject-button');
        approveButtons[index].classList.remove('selected');
        rejectButtons[index].classList.add('selected');
    };

    const handleOnClick = async (e) => {
        e.preventDefault();
        if (docStatus.includes(0)) {
            console.log("docStatus", docStatus);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Please check all documents' }
            });
        } else {
            dispatch(updateDocStatus({ id, auth, docStatus }));
        }
    }

    useEffect(() => {
        if (alert.success) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {}
            })
            setDocStatus([0, 0, 0, 0]);
            navigate('/');
        }
    }, [alert.success, dispatch, navigate])

    return (
        <div>
            {officer.loading ? (
                <Loading className='alert-container loading' />
            ) : (
                <div className='offficerCheck-main-div'>
                    <div className='offficerCheck-uploadDoc-userInfo-container uploadDoc-userInfo-container'>
                        <img src={officer.labour.profilePhoto} alt="Person's name and description" />
                        <div className='uploadDoc-user-detail'>
                            <h2>Username: {officer.labour.userName}</h2>
                            <p className='offficerCheck-p' style={{ fontSize: "12px" }}>UserId: {officer.labour.userId}</p>
                        </div>
                    </div>
                    <div className='offficerCheck-div'>
                        <div className="offficerCheck-container-wrapper">
                            {officer.docs.documents && officer.docs.documents.map((doc, index) => (
                                <div className="offficerCheck-container" key={doc}>
                                    <div className="offficerCheck-photo">
                                        <img src={doc} alt="user profile" />
                                    </div>
                                    <div className="offficerCheck-button-container">
                                        <button className="offficerCheck-approve-button"
                                            onClick={() => handleApprove(index)} disabled={docStatus[index] === documentStatus['approved']}>Approve</button>
                                        <button className="offficerCheck-reject-button" onClick={() => handleReject(index)} disabled={docStatus[index] === documentStatus['rejected']}>Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="offficerCheck-pagination">
                            {/* <button className="offficerCheck-pagination-button">Previous</button> */}
                            <button className="offficerCheck-pagination-button" onClick={handleOnClick} >Submit</button>
                            {/* <button className="offficerCheck-pagination-button">Next</button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Check
