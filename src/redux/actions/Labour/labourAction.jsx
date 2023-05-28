import { getDataAPI, putDataAPI } from "../../../utils/fetchData"
import { GLOBALTYPES } from "../globalTypes"

export const LABOUR_TYPE = {
    LOADING: 'LOADING_LABOUR_TYPE',
    GET_JOBS_DETAIL: 'GET_JOBS_DETAIL',
    GET_APPLIED_JOBS_DETAIL: 'GET_APPLIED_JOBS_DETAIL',
    GET_DETAIL_LABOURDOCS: 'GET_DETAIL_LABOURDOCS'
    // GET_LABOUR_INFO: 'GET_LABOUR_INFO',
    // GET_LABOUR_DOCS: 'GET_LABOUR_DOCS',
    // GET_LABOUR_ID: 'GET_LABOUR_ID',
    // GET_APPROVED_LABOUR: 'GET_APPROVED_LABOUR',
    // GET_REJECTED_LABOUR: 'GET_REJECTED_LABOUR',

}

export const getJobList = (token) => async (dispatch) => {
    try {
        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI('labour/get_job_list', token)

        dispatch({
            type: LABOUR_TYPE.GET_JOBS_DETAIL,
            payload: {
                job_data: res.data.data.job_data, total_count: res.data.data.state.count_data
            }
        })

        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}


export const updateJobById = (token, jobId) => async (dispatch) => {
    try {
        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: true } })

        const res = await putDataAPI('labour/update_job_by_id', { jobId }, token)

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
            }
        })

        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: false } })
    }
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}


export const getAppliedJobList = (token) => async (dispatch) => {
    try {
        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI('labour/get_applied_job', token)


        console.log("getAppliedJobList res", res);

        dispatch({
            type: LABOUR_TYPE.GET_APPLIED_JOBS_DETAIL,
            payload: {
                applied_job_data: res.data.data.applied_job_data, total_count: res.data.data.state.count_data
            }
        })

        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}


export const get_detail_labourDocs = (token) => async (dispatch) => {
    try {

        console.log("----------------------******");
        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI('labour/get_detail_labourDocs', token)

        console.log("res get_detail_labourDocs", res);

        dispatch({
            type: LABOUR_TYPE.GET_DETAIL_LABOURDOCS,
            payload: {
                documents_data: res.data.data.documents_data
            }
        })

        dispatch({ type: LABOUR_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}