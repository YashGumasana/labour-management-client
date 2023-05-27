import React, { useEffect, useState } from 'react'
import { getAcceptedLabourList, getRejectedLabourList, } from '../../redux/actions/Officer/labourDetailAction'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import Loading from '../../components/alert/Loading'
import { documentName } from '../../common'

const Rejected = () => {
    const { auth, officer } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRejectedLabourList(auth.token, ''))
    }, [dispatch, auth.token])

    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        let token = auth.token
        let search = searchInput
        dispatch(getRejectedLabourList(token, search))
    }
    return (
        <div>
            <form className='officerHome-form' onSubmit={handleSearch}>
                {/* <label for="officerHome-search">Search:</label> */}
                <input type="text" id="officerHome-search" name="search" placeholder="Enter UserId" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <Button className='officerHome-search-button' type="submit"><AiOutlineSearch className='AiOutlineSearch' /></Button>
            </form>

            {officer.loading ? (<Loading className='alert-container loading' />
            )
                : (
                    <table className="officerHome-table">
                        <thead className='officerHome-table-thead' >
                            <tr>
                                <th style={{ width: "125px" }}>USER ID</th>
                                <th>REJECTED PROOF</th>
                                <th style={{ width: "125px" }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody className='officerHome-table-tbody' >
                            {officer.rejectedLabour
                                .map(
                                    data => (
                                        <tr key={data.userId}>
                                            <td>{data.userId}</td>

                                            <td>{
                                                data.docStatus[0].docStatus.map((dStatus, key) => {
                                                    if (dStatus === 2) {
                                                        return `${documentName[key]},`;
                                                    }
                                                })
                                            }</td>
                                            <td>
                                                <button className="officerHome-check-btn rejected-status">
                                                    Rejected
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

export default Rejected

