import { CONSTURCTOR_TYPE } from "../actions/Contractor/contractor";

const initialState = {
    loading: false,
    requested_job_data: [],
    docs: [],
    labour: [],
    created_jobs: [],
    feedback_data: []
}

const contractorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTURCTOR_TYPE.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        case CONSTURCTOR_TYPE.GET_LABOUR_DETAIL:
            return {
                ...state,
                requested_job_data: action.payload.requested_job_data
            }

        case CONSTURCTOR_TYPE.GET_LABOUR_DOCS:
            // console.log("action officer get labour docs", action);

            return {
                ...state,
                docs: action.payload
            }
        case CONSTURCTOR_TYPE.GET_LABOUR_INFO:
            return {
                ...state,
                labour: action.payload
            }
        case CONSTURCTOR_TYPE.GET_CREATED_JOBS_DETAIL:
            return {
                ...state,
                created_jobs: action.payload.created_jobs
            }
        case CONSTURCTOR_TYPE.GET_FEEDBACK_DETAIL:
            return {
                ...state,
                feedback_data: action.payload.feedback_data
            }
        default:
            return state;
    }
}


export default contractorReducer;
