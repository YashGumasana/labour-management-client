import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { create_job } from '../../redux/actions/Contractor/contractor';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const CreateJob = () => {
    const { auth, } = useSelector(state => state);
    const dispatch = useDispatch();


    const initialState = {
        jobTitle: '',
        description: '',
        experinceLevel: '',
        location: '',
        salery: '',
        timeDuration: '',
    }

    let [createJobData, setCreateJobData] = useState(initialState)

    const { jobTitle,
        description,
        experinceLevel,
        location,
        salery,
        timeDuration, } = createJobData

    const handleChangeInput = e => {
        const { name, value } = e.target

        setCreateJobData({ ...createJobData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(create_job({ createJobData, auth }))
        setCreateJobData(initialState);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }

    return (
        <div className='container1'>
            <h1 className='text-center text-white'>Create Job</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <div>
                    <input type="text" style={{ color: 'black' }} placeholder='Job Title' autoComplete="none" name='jobTitle' id='name' onChange={handleChangeInput} value={jobTitle} />
                </div>
                <div>
                    <input type="text" style={{ color: 'black' }} className="gender-details" name="description" autoComplete="none" placeholder="Description" onChange={handleChangeInput} value={description} />
                </div>
                <div>
                    <input type="text" style={{ color: 'black' }} id="email" name="experinceLevel" autoComplete="none" placeholder="Experince Level" onChange={handleChangeInput} value={experinceLevel} />
                </div>
                <div>
                    <input type="text" style={{ color: 'black' }} className="gender-details" name="location" autoComplete="none" placeholder="Location" onChange={handleChangeInput} value={location} />
                </div>
                <div>
                    <input type="text" style={{ color: 'black' }} id="phoneNumber" name="salery" autoComplete="none" placeholder="salary" onChange={handleChangeInput} value={salery} />
                </div>
                <div>
                    <input type="text" style={{ color: 'black' }} className="gender-details" name="timeDuration" autoComplete="none" placeholder="TimeDuration" onChange={handleChangeInput} value={timeDuration} />
                </div>
                <div className='action-button'>
                    <button type='submit' id='registerBtn' style={{
                        marginBottom: "25px"
                    }}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateJob