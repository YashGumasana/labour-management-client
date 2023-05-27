import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { get_feedback_detail } from '../../../redux/actions/Contractor/contractor';

const ViewHistory = () => {

    const { auth, contractor } = useSelector(state => state);
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();


    useEffect(() => {

        if (id) {
            dispatch(get_feedback_detail({ id, auth }));
        }
    }, [dispatch, id, auth]);

    const handleOnClick = async (e) => {
        e.preventDefault();
        navigate('/');
    }
    return (
        <div>

            <div className="officer-profile-container">
                <h1 style={{ paddingTop: "20px", paddingBottom: "0px" }}>FeedBack</h1>

                <div style={{ marginTop: "20px" }} className="officer-profile-info-container">
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">UserId</div>
                        <div className="officer-profile-info-value">{contractor.feedback_data.userId}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">Tenure</div>
                        <div className="officer-profile-info-value">{contractor.feedback_data.tenure}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">Remark</div>
                        <div className="officer-profile-info-value">{contractor.feedback_data.remark}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">FeedBack By</div>
                        <div className="officer-profile-info-value">{contractor.feedback_data.feedbackBy}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">Job Title</div>
                        <div className="officer-profile-info-value">job2</div>
                    </div>

                </div >
                <div className="offficerCheck-pagination">
                    {/* <button className="offficerCheck-pagination-button">Previous</button> */}
                    <button className="offficerCheck-pagination-button" onClick={handleOnClick} >Back to Home</button>
                    {/* <button className="offficerCheck-pagination-button">Next</button> */}
                </div>
            </div >
        </div >
    )
}

export default ViewHistory



