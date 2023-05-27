import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLabourList, getLabourListBySearch } from '../../redux/actions/Officer/labourDetailAction'
import { Button } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai'
import Loading from '../../components/alert/Loading'
import { Link } from 'react-router-dom'
import { documentName } from '../../common'

const Home = () => {
    const { auth, officer } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLabourList(auth.token))
    }, [dispatch, auth.token])

    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        let token = auth.token
        let search = searchInput
        dispatch(getLabourListBySearch(token, search))
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
                                <th>PROOF</th>
                                <th style={{ width: "125px" }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody className='officerHome-table-tbody' >
                            {officer.labours
                                .map(
                                    data => (
                                        <tr key={data.userId}>
                                            <td>{data.userId}</td>
                                            <td>{documentName[0]},{documentName[1]}, {documentName[2]},{documentName[3]}</td>
                                            <td>
                                                <Link className="officerHome-check-btn-Link" to={`/check/${data._id}`}>
                                                    <button className="officerHome-check-btn">
                                                        Check
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

export default Home
