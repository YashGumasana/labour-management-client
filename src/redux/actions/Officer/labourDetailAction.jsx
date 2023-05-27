import { documentStatus } from "../../../common"
import { getDataAPI, postDataAPI, putDataAPI } from "../../../utils/fetchData"
import { GLOBALTYPES } from "../globalTypes"

export const OFFICER_TYPE = {
    LOADING: 'LOADING_LABOUR_DETAIL',
    GET_LABOURS_DETAIL: 'GET_LABOURS_DETAIL',
    GET_LABOUR_INFO: 'GET_LABOUR_INFO',
    GET_LABOUR_DOCS: 'GET_LABOUR_DOCS',
    GET_LABOUR_ID: 'GET_LABOUR_ID',
    GET_APPROVED_LABOUR: 'GET_APPROVED_LABOUR',
    GET_REJECTED_LABOUR: 'GET_REJECTED_LABOUR',

}

export const getLabourList = (token) => async (dispatch) => {
    try {
        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: true } })
        const res = await getDataAPI('/officer/labourList', token)

        dispatch({
            type: OFFICER_TYPE.GET_LABOURS_DETAIL,
            payload: {
                labour_data: res.data.data.labour_data, total_count: res.data.data.count_data
            }
        })

        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: false } })


    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getLabourListBySearch = (token, search) => async (dispatch) => {
    try {

        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: true } })
        const res = await postDataAPI('/officer/get_labour_list_by_search', { search }, token)

        dispatch({
            type: OFFICER_TYPE.GET_LABOURS_DETAIL,
            payload: { labour_data: res.data.data.labour_data, total_count: res.data.data.state.count_data }
        })

        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: false } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}


export const getLabourDocs = ({ id, auth }) => async (dispatch) => {

    console.log("get labour docs api call ");

    dispatch({ type: OFFICER_TYPE.GET_LABOUR_ID, payload: id })

    try {
        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI(`/officer/get_labour_docs_by_id/${id}`, auth.token)
        const res1 = await getDataAPI(`/officer/get_labour_info_by_id/${id}`, auth.token)


        const labourDoc = res;
        const lab = res1;


        dispatch({
            type: OFFICER_TYPE.GET_LABOUR_INFO,
            payload: lab.data.data.labour_data
        })

        dispatch({
            type: OFFICER_TYPE.GET_LABOUR_DOCS,
            payload: labourDoc.data.data.labour_data

        })

        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updateDocStatus = ({ id, auth, docStatus }) => async (dispatch) => {



    try {
        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: true } })


        const res = await putDataAPI('/officer/update_labour_doc_status', { id, docStatus }, auth.token)



        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: false } })
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
            }
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}


export const getAcceptedLabourList = (token, search) => async (dispatch) => {
    try {
        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: true } })

        const res = await postDataAPI('/officer/get_approved_labour_list', { search }, token)


        dispatch({
            type: OFFICER_TYPE.GET_APPROVED_LABOUR,
            payload: { labour_data: res.data.data.labour_data, total_count: res.data.data.state.count_data }
        })

        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: false } })


    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}


export const getRejectedLabourList = (token, search) => async (dispatch) => {
    try {
        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: true } })

        const res = await postDataAPI('/officer/get_rejected_labour_list', { search }, token)


        dispatch({
            type: OFFICER_TYPE.GET_REJECTED_LABOUR,
            payload: { labour_data: res.data.data.labour_data, total_count: res.data.data.state.count_data }
        })

        dispatch({ type: OFFICER_TYPE.LOADING, payload: { loading: false } })


    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

