import { postDataAPI, postFileAPI } from "../../../utils/fetchData";
import { imageUpload } from "../../../utils/imageUpload";
import { GLOBALTYPES } from "../globalTypes";

export const uploadDoc = ({ documentPhoto, auth }) => async (dispatch) => {
    let res;

    console.log('auth', auth);

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (documentPhoto.length === 4 && documentPhoto[0] !== '' && documentPhoto[1] !== '' && documentPhoto[2] !== '' && documentPhoto[3] !== '') {

            const formData = new FormData();
            documentPhoto.forEach((file, index) => {
                // console.log('file', file);
                // console.log('index', index);
                formData.append(`document${index}`, file);
                // console.log("document", documents);
            });

            // let documents = documentPhoto
            // console.log('documents', documents);

            res = await postFileAPI("labour/uploadDoc", formData
                , auth.token)

            console.log("res", res);

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    success: res.data.message,
                }
            })
        }

        else {
            return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Please upload all document' } })
        }
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