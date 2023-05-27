import { getDataAPI, postDataAPI } from "../../../utils/fetchData";
import { validFeedBackDetail, validJobDetail } from "../../../utils/valid"
import { GLOBALTYPES } from "../globalTypes";


export const CONSTURCTOR_TYPE = {
    LOADING: 'LOADING_CONSTURCTOR_TYPE',
    GET_LABOUR_DETAIL: 'GET_LABOUR_DETAIL',
    GET_CREATED_JOBS_DETAIL: 'GET_CRETAED_JOBS_DETAIL',
    GET_LABOUR_INFO: 'GET_LABOUR_INFO',
    GET_LABOUR_DOCS: 'GET_LABOUR_DOCS',
    GET_FEEDBACK_DETAIL: 'GET_FEEDBACK_DETAIL',
    // GET_APPROVED_LABOUR: 'GET_APPROVED_LABOUR',
    // GET_REJECTED_LABOUR: 'GET_REJECTED_LABOUR',

}

export const create_job = ({ createJobData, auth }) => async (dispatch) => {
    const check = validJobDetail(createJobData);

    if (check?.errLength > 0) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: check.errMsg
            }
        })
    }

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI(`/contractor/createJob`, createJobData, auth.token)
        // console.log('register res', res);


        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
            }
        })

    } catch (err) {
        console.log("err", err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.message
            }
        })
    }
}


export const get_crated_job = (token) => async (dispatch) => {
    try {
        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: true } })
        const res = await getDataAPI('/contractor/get_crated_job', token)

        dispatch({
            type: CONSTURCTOR_TYPE.GET_CREATED_JOBS_DETAIL,
            payload: {
                created_jobs: res.data.data.created_jobs,
            }
        })

        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        console.log("err", err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.message
            }
        })
    }
}


export const get_labour_request_for_job = (token) => async (dispatch) => {
    try {
        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI('/contractor/get_labour_request_for_job', token)


        dispatch({
            type: CONSTURCTOR_TYPE.GET_LABOUR_DETAIL,
            payload: {
                requested_job_data: res.data.data.requested_job_data,
            }
        })

        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}



export const get_labour_data = ({ id, token }) => async (dispatch) => {
    try {
        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: true } })

        console.log("-----------------------------hhhhh");

        const res = await getDataAPI(`/contractor/get_labour_docs_by_id/${id}`, token)
        const res1 = await getDataAPI(`/contractor/get_labour_info_by_id/${id}`, token)

        console.log(res, "res-----------------");
        const labourDoc = res;
        const lab = res1;


        dispatch({
            type: CONSTURCTOR_TYPE.GET_LABOUR_INFO,
            payload: lab.data.data.labour_data
        })

        dispatch({
            type: CONSTURCTOR_TYPE.GET_LABOUR_DOCS,
            payload: labourDoc.data.data.labour_data
        })

        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const feedback_for_labour_by_contractor = ({ feedBackData, auth }) => async (dispatch) => {
    const check = validFeedBackDetail(feedBackData);

    if (check?.errLength > 0) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: check.errMsg
            }
        })
    }

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI(`/contractor/feedback_for_labour_by_contractor`, feedBackData, auth.token)

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
            }
        })

    } catch (err) {
        console.log("err", err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.message
            }
        })
    }
}


export const get_feedback_detail = ({ id, auth }) => async (dispatch) => {

    console.log('id------------------', `/contractor/get_feedback_detail/${id}`);
    try {
        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI(`/contractor/get_feedback_detail/${id}`, auth.token)

        console.log('res get_feedback_detail', res);
        dispatch({
            type: CONSTURCTOR_TYPE.GET_FEEDBACK_DETAIL,
            payload: {
                feedback_data: res.data.data.feedback_data
            }
        })

        dispatch({ type: CONSTURCTOR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}