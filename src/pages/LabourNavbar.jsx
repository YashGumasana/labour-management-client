import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';

const LabourNavbar = () => {
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
        { label: 'Applied', path: '/applied' },
        { label: 'Profile', path: '/profile' },
    ]

    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) {
            return 'active'
        }
    }
    console.log("LabourNavbar ---------");
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
    // const { auth } = useSelector(state => state);
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch({
    //         type: GLOBALTYPES.ALERT,
    //         payload: {
    //         }
    //     })
    // }, [dispatch])

    // const navLinks = [
    //     { label: 'Home', path: '/' },
    //     { label: 'Approved', path: '/approved' },
    //     { label: 'Rejected', path: '/rejected' },
    //     { label: 'Profile', path: '/profile' },
    // ]

    // const { pathname } = useLocation()

    // const isActive = (pn) => {
    //     if (pn === pathname) {
    //         return 'active'
    //     }
    // }

    // if (!auth.token || auth.user.category !== 2) {
    //     return null;
    // }
    // return (

    // )
}

export default LabourNavbar
