import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { documentName } from '../../common';
import { get_detail_labourDocs } from '../../redux/actions/Labour/labourAction';
import Loading from '../../components/alert/Loading';

const StatusCheck = () => {
    const { auth, labour } = useSelector((state) => state);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_detail_labourDocs(auth.token));
    }, [dispatch, auth]);

    let isAllZero;
    let rejectedDocuments = [];

    console.log('labour.documents_data.docStatus', labour.documents_data);

    // if (auth?.labDocStatusRes?.docStatus[0]) {
    const arr = labour.documents_data.docStatus;
    isAllZero = arr?.every((value) => value === 0);

    if (!isAllZero) {

        rejectedDocuments = arr?.reduce((acc, value, index) => {
            if (value === 2) {
                acc.push(documentName[index]);
            }
            return acc;
        }, []);
    }
    // } else {
    //     isAllZero = true;
    // }


    console.log('isAllZero', isAllZero);
    return (




        <div className="statuscheck-login-form">
            {labour.loading ? (<Loading className='alert-container loading' />)
                : labour.documents_data.docStatus && (
                    <form>
                        <section className="statuscheck-container"></section>
                        <div>
                            <h1 className="statuscheck-h1">
                                <center className="statuscheck-response">
                                    {isAllZero
                                        ? "Your document are in pending"
                                        : `Your ${rejectedDocuments.join(", ")} ${rejectedDocuments.length > 1 ? "are" : "is"
                                        } rejected`}
                                </center>
                            </h1>
                        </div>

                        <div className="action" style={{ justifyContent: "space-evenly" }}>
                            <Link to="/UploadDoc"><button className="officerHome-sign-out-btn" disabled={isAllZero}>Resubmite</button></Link>


                            <Link to="/" onClick={() => dispatch(logout())}><button className="officerHome-sign-out-btn">Sign Out</button></Link>
                        </div>
                    </form>)}
        </div>
    );

}

export default StatusCheck
