import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/alert/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { get_labour_data } from '../../../redux/actions/Contractor/contractor'


const Check = () => {

    const navigate = useNavigate()
    const { id } = useParams();


    const { auth, contractor } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(get_labour_data({ id, token: auth.token }))
        }
    }, [dispatch, auth.token, id])



    const handleOnClick = async (e) => {
        e.preventDefault();
        navigate('/');
    }


    return (
        <div>
            {contractor.loading ? (
                <Loading className='alert-container loading' />
            ) : (
                <div className='offficerCheck-main-div'>
                    <div className='offficerCheck-uploadDoc-userInfo-container uploadDoc-userInfo-container'>
                        <img src={contractor.labour.profilePhoto} alt="Person's name and description" />
                        <div className='uploadDoc-user-detail'>
                            <h2>Username: {contractor.labour.userName}</h2>
                            <p className='offficerCheck-p' style={{ fontSize: "12px" }}>UserId: {contractor.labour.userId}</p>
                        </div>
                    </div>
                    <div className='offficerCheck-div'>
                        <div className="offficerCheck-container-wrapper">
                            {contractor.docs.documents && contractor.docs.documents.map((doc, index) => (
                                <div className="offficerCheck-container" key={doc}>
                                    <div className="offficerCheck-photo">
                                        <img src={doc} alt="user profile" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="offficerCheck-pagination">
                            {/* <button className="offficerCheck-pagination-button">Previous</button> */}
                            <button className="offficerCheck-pagination-button" onClick={handleOnClick} >Back to Home</button>
                            {/* <button className="offficerCheck-pagination-button">Next</button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Check
