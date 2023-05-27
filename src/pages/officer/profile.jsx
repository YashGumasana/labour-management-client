import React from 'react'
import { useSelector } from 'react-redux'
import { genderStatus, userStatus } from '../../common'

const Profile = () => {
    const { auth } = useSelector(state => state)

    return (
        <div>
            <div className="officer-profile-container">
                <div className="officer-profile-cover-photo">
                    <img src={auth.user.profilePhoto}
                        alt='profile of user' className="officer-profile-profile" />
                </div>
                <div className="officer-profile-profile-name">{auth.user.fullName}</div>
                <div className="officer-profile-info-container">
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">UserName</div>
                        <div className="officer-profile-info-value">{auth.user.userName}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">Email</div>
                        <div className="officer-profile-info-value">{auth.user.email}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">MobileNo</div>
                        <div className="officer-profile-info-value">{auth.user.phoneNumber}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">Category</div>
                        <div className="officer-profile-info-value">{Object.keys(userStatus).find(
                            (key) => userStatus[key] === auth.user.category)}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">UserId</div>
                        <div className="officer-profile-info-value">{auth.user.userId}</div>
                    </div>
                    <div className="officer-profile-info-row">
                        <div className="officer-profile-info-label">Gender</div>
                        <div className="officer-profile-info-value">{Object.keys(genderStatus).find(
                            (key) => genderStatus[key] === auth.user.gender)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
