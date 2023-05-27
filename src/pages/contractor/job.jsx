import React, { useEffect } from 'react'
import Loading from '../../components/alert/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { get_crated_job } from '../../redux/actions/Contractor/contractor'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Job = () => {
    const { auth, contractor } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_crated_job(auth.token))
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
                                <th style={{ width: "125px" }}>EXPERINCE LEVEL</th>
                                <th style={{ width: "125px" }}>LOCATION</th>
                                <th style={{ width: "125px" }}>SALERY</th>
                                <th style={{ width: "125px" }}>TIME DURATION</th>
                                <th>DESCRIPTION</th>
                                <th style={{ width: "125px" }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody className='officerHome-table-tbody' >
                            {contractor.created_jobs
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
                                                <button className="officerHome-check-btn fficerHome-check-btn-Link" style={{ backgroundColor: "#FF506E", color: "white" }}>
                                                    Created
                                                </button>
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

export default Job