import { OFFICER_TYPE } from "../actions/Officer/labourDetailAction";

const initialState = {
    loading: false,
    labours: [],
    docs: [],
    ids: [],
    labour: [],
    approvedLabour: [],
    rejectedLabour: []
}

const officerReducer = (state = initialState, action) => {

    switch (action.type) {

        case OFFICER_TYPE.LOADING:
            // console.log("action officer loading", action);

            return {
                ...state,
                loading: action.payload.loading
            }
        case OFFICER_TYPE.GET_LABOURS_DETAIL:
            return {
                ...state,
                labours: action.payload.labour_data
            }
        case OFFICER_TYPE.GET_LABOUR_DOCS:
            // console.log("action officer get labour docs", action);

            return {
                ...state,
                docs: action.payload
            }
        case OFFICER_TYPE.GET_LABOUR_INFO:
            return {
                ...state,
                labour: action.payload
            }
        case OFFICER_TYPE.GET_LABOUR_ID:
            return {
                ...state,
                ids: action.payload
            }
        case OFFICER_TYPE.GET_APPROVED_LABOUR:
            return {
                ...state,
                approvedLabour: action.payload.labour_data
            }
        case OFFICER_TYPE.GET_REJECTED_LABOUR:
            return {
                ...state,
                rejectedLabour: action.payload.labour_data
            }
        default:
            return state;
    }
}

export default officerReducer;
