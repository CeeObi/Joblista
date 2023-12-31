import React from 'react'
import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { logoutUserReset } from '../features/user/userSlice';


const customFetch = axios.create({
    baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
})


customFetch.interceptors.request.use(
    (config) => {
        const user = getUserFromLocalStorage()
        if (user){
            config.headers.Authorization = `Bearer ${user.token}`;
        }

        return config
    }
)



const checkForUnauthorizedRequest = (error,thunkAPI) =>{
    if (error.response.status === 401){
        thunkAPI.dispatch(logoutUserReset())
        return thunkAPI.rejectWithValue("Unauthorized! Logged out..");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);

}





export default customFetch;
export {checkForUnauthorizedRequest};