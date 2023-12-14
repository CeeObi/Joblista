import customFetch from "../utils/axios";
import { logoutUser } from "./user/userSlice";

const registerUserThunk = async (url,user,{rejectWithValue}) => {
    try {  
        const response = await customFetch.post(url, user);        
        return response.data;      
    } 
    catch (error) {     
        return rejectWithValue(error.response.data.msg);
    }
}


const loginUserThunk = async (url,user,thunkAPI) => {
    try {     
        const response = await customFetch.post(url, user);
        return response.data;      
    } 
    catch (error) {        
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }   
}


const editUserDataThunk = async (url,user,thunkAPI) => {
    try {     
        const response = await customFetch.patch(url, user, { headers:{
                Authorization: `Bearer ${thunkAPI.getState().userStore.user.token}`
        }
    }); 
        return response.data;      
    } 
    catch (error) {  
        if (error.response.status === 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue("Unauthorized! Logged out user..");
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }  
}



export {registerUserThunk, loginUserThunk, editUserDataThunk}