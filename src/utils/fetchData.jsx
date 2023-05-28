import axios from 'axios'
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://labour-management-server.onrender.com';


export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL}/${url}`, post,
        {
            headers: { Authorization: token }
        })

    return res;
}

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`,
        {
            headers: { Authorization: token }
        })

    return res;
}

export const postFileAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL}/${url}`, post,
        {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${BASE_URL}/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}