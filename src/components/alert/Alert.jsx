import React from 'react'
import { useSelector } from 'react-redux'
// import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Loading from './Loading'
import saberToast from './Toast'

const Alert = () => {
    const { alert, officer, labour, contractor } = useSelector(state => state)
    // const dispatch = useDispatch()

    // console.log("alert ------------------------", alert);

    return (
        <div className='alert-container'>

            {alert.loading && <Loading className='alert-container loading' />}
            {officer.loading && <Loading className='alert-container loading' />}
            {labour.loading && <Loading className='alert-container loading' />}
            {contractor.loading && <Loading className='alert-container loading' />}

            {
                alert.error && (
                    saberToast.error({
                        title: 'Error',
                        text: alert.error,
                        delay: 200,
                        duration: 2000,
                        position: "top-right"
                    })
                )
            }
            {
                alert.success && (
                    saberToast.success({
                        title: 'success',
                        text: alert.success,
                        delay: 200,
                        duration: 2000,
                        position: "top-right"
                    })
                )
            }
        </div>
    )
}



export default Alert
