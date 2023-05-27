import { LABOUR_TYPE } from "../actions/Labour/labourAction"

const initialState = {
    loading: false,
    jobs: [],
    applied_jobs: [],
    documents_data: []
}

const labourReducer = (state = initialState, action) => {
    switch (action.type) {
        case LABOUR_TYPE.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        case LABOUR_TYPE.GET_JOBS_DETAIL:
            return {
                ...state,
                jobs: action.payload.job_data
            }
        case LABOUR_TYPE.GET_APPLIED_JOBS_DETAIL:
            return {
                ...state,
                applied_jobs: action.payload.applied_job_data
            }
        case LABOUR_TYPE.GET_DETAIL_LABOURDOCS:
            return {
                ...state,
                documents_data: action.payload.documents_data
            }
        default:
            return state;
    }
}


export default labourReducer;
