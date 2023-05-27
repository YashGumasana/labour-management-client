import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../../src/redux/actions/authAction'
import { GLOBALTYPES } from '../redux/actions/globalTypes'


const OfficerHome = () => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
            }
        })
    }, [dispatch])

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Approved', path: '/approved' },
        { label: 'Rejected', path: '/rejected' },
        { label: 'Profile', path: '/profile' },
    ]

    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) {
            return 'active'
        }
    }

    if (!auth.token || auth.user.category !== 2) {
        return null;
    }

    return (
        <div className='officerHome'>
            <nav>
                <div className="officerHome-logo">Network</div>
                <ul className="officerHome-nav-items" style={{ marginBottom: "0px" }}>
                    {
                        navLinks.map((link, index) => (
                            <li className={`officerHome-nav-item ${isActive(link.path)}`} key={index}>
                                <Link className="nav-link" to={link.path}>
                                    {link.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Link to="/" onClick={() => dispatch(logout())}><button className="officerHome-sign-out-btn">Sign Out</button></Link>
            </nav>

        </div>
    )
}

export default OfficerHome


/* <form className='officerHome-form' onSubmit={handleSearch}>
<input type="text" autoComplete='none' id="officerHome-search" name="search" placeholder="Enter UserId" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
<Button className='officerHome-search-button' type="submit"><AiOutlineSearch className='AiOutlineSearch' /></Button>
</form>

{officer.loading.loading ? (<Loading className='alert-container loading' />
)
: (
    <table className="officerHome-table">
        <thead className='officerHome-table-thead' >
            <tr>
                <th style={{ width: "125px" }}>USER ID</th>
                <th>PROOF</th>
                <th style={{ width: "125px" }}>CHECK</th>
            </tr>
        </thead>
        <tbody className='officerHome-table-tbody' >
            {officer.labours
                .map(
                    data => (
                        <tr key={data.userId}>
                            <td>{data.userId}</td>
                            <td>Proof</td>
                            <td><button className="officerHome-check-btn">Check</button></td>
                        </tr>
                    )
                )
            }
        </tbody>
    </table>
)} */