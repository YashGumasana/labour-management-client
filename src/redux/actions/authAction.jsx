import { userStatus } from "../../common"
import { postDataAPI } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUpload"
import { GLOBALTYPES } from "./globalTypes"
import { valid } from "../../utils/valid"





export const register = ({ userData, profile }) => async (dispatch) => {

    const check = valid(userData)
    let media;

    console.log(profile);
    if (!profile) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: 'upload profile photo'
            }
        })
    }

    if (check?.errLength > 0) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: check.errMsg
            }
        })
    }

    const { confirmPassword, ...userDataWithoutConfirmPassword } = userData;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (profile) {
            media = await imageUpload([profile]);
        }

        console.log(media[0].url);
        userDataWithoutConfirmPassword.profilePhoto = media[0].url

        const user = Object.keys(userStatus).find(
            (key) => userStatus[key] === userDataWithoutConfirmPassword.category
        )
        const res = await postDataAPI(`user/register`, userDataWithoutConfirmPassword)
        // console.log('register res', res);


        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
                category: user
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

export const login = (userData, category) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await postDataAPI(`user/login`, userData)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.data.token,
                user: res.data.data.response,
                labDocStatusRes: res.data.data.labDocStatusRes
            }
        })
        localStorage.setItem("firstLogin", true)
        // localStorage.setItem("user", JSON.stringify(res.data.data.response))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message
            }
        })
    }
    catch (err) {
        console.log("err", err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")

    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        try {
            const res = await postDataAPI('user/refresh_token')


            console.log("res", res);

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.data.token,
                    user: res.data.data.user,
                    labDocStatusRes: res.data.data.labDocStatusRes
                }
            })
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        // localStorage.removeItem('user')
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}