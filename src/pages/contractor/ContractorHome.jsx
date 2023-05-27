import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { get_labour_request_for_job } from '../../redux/actions/Contractor/contractor';
import Loading from '../../components/alert/Loading';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const ContractorHome = () => {
    const { auth, contractor } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_labour_request_for_job(auth.token))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }, [dispatch, auth.token])


    return (
        <div>
            {contractor.loading ? (<Loading className='alert-container loading' />
            )
                : (
                    <table className="officerHome-table">
                        <thead className='officerHome-table-thead' >
                            <tr>
                                <th style={{ width: "125px" }}>JOB TITLE</th>
                                <th style={{ width: "125px" }}>LABOUR ID</th>
                                <th style={{ width: "125px" }}>LABOUR NAME</th>
                                <th style={{ width: "125px" }}>LABOUR PHONENUMBER</th>
                                <th>View History</th>
                                <th style={{ width: "125px" }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody className='officerHome-table-tbody'>
                            {contractor.requested_job_data &&
                                contractor.requested_job_data.map(data =>
                                    data.user.map(innerData => (
                                        <tr key={innerData.userId}>
                                            <td>{data.jobTitle}</td>
                                            <td>{innerData.userId}</td>
                                            <td>{innerData.userName}</td>
                                            <td>{innerData.phoneNumber}</td>
                                            {data.feedback.length > 0 ? (
                                                data.feedback.map(feedbackData => (
                                                    <td key={feedbackData._id}>
                                                        <Link className="officerHome-check-btn-Link" to={`/feedback/${feedbackData._id}`}>
                                                            <button className="officerHome-check-btn">View</button>
                                                        </Link>
                                                    </td>
                                                ))
                                            ) : (
                                                <td>NAN</td>
                                            )}
                                            <td>
                                                <Link className="officerHome-check-btn-Link" to={`/check/${innerData._id}`}>
                                                    <button className="officerHome-check-btn">Check Docs</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>

                    </table>
                )}
        </div>
    )
}

export default ContractorHome
