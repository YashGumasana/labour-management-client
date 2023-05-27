import React from 'react'
import Loading from './alert/Loading'
import { useSelector } from 'react-redux'

const NotFound = () => {
    const { alert, officer } = useSelector(state => state)

    return (
        <>
            {/* {alert.loading && <Loading className='alert-container loading' />} */}
            {/* {officer.loading && <Loading className='alert-container loading' />} */}
            <div className="position-relative" style={{ minHeight: 'calc(100vh - 70px)' }}>
                <h2 className="position-absolute text-secondary"
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    404 | Not Found.
                </h2>
            </div>
        </>
    )
}

export default NotFound
