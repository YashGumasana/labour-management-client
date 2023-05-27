import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import officer from './officerReducer'
import labour from './labourReducer'
import contractor from './contractorReducer'

export default combineReducers({
    auth,
    alert,
    officer,
    labour,
    contractor
})
