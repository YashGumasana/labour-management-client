import React, { useEffect } from 'react'
import Loading from '../../components/alert/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getJobList, updateJobById } from '../../redux/actions/Labour/labourAction'
import { Link } from 'react-router-dom'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const LabourHome = () => {
    const { auth, labour } = useSelector(state => state)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getJobList(auth.token))


    }, [dispatch, auth.token])


    const handleApply = async (jobId) => {
        dispatch(updateJobById(auth.token, jobId))
        dispatch(getJobList(auth.token))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    };

    return (
        <div>


            {labour.loading ? (<Loading className='alert-container loading' />
            )
                : (
                    <table className="officerHome-table">
                        <thead className='officerHome-table-thead' >
                            <tr>
                                <th style={{ width: "125px" }}>JOB TITLE</th>
                                <th style={{ width: "125px" }}>EXPERINCE LEVEL</th>
                                <th style={{ width: "125px" }}>LOCATION</th>
                                <th style={{ width: "125px" }}>SALERY</th>
                                <th style={{ width: "125px" }}>TIME DURATION</th>
                                <th>DESCRIPTION</th>
                                <th style={{ width: "125px" }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody className='officerHome-table-tbody' >
                            {labour.jobs
                                .map(
                                    data => (
                                        <tr key={data._id}>
                                            <td>{data.jobTitle}</td>
                                            <td>{data.experinceLevel}</td>
                                            <td>{data.location}</td>
                                            <td>{data.salery}</td>
                                            <td>{data.timeDuration}</td>
                                            <td>{data.description}</td>
                                            <td>
                                                <Link className="officerHome-check-btn-Link">
                                                    <button className="officerHome-check-btn" onClick={() => handleApply(data._id)}>
                                                        Apply
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                )}
        </div>
    )
}

export default LabourHome
