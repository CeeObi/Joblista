import authHeader from "../utils/authHeader";
import customFetch from "../utils/axios";
import { allJob, hideLoading, showLoading } from "./allJobs/allJobsSlice";
import { handleReset } from "./job/jobSlice";
import { logoutUser } from "./user/userSlice";

///////////////
const createJobThunk = async (job,thunkAPI) => {
    try {  
        const response = await customFetch.post("/jobs", job)//, authHeader(thunkAPI) );    
        thunkAPI.dispatch(handleReset())  
        return response.data;      
    } 
    catch (error) {  
        if (error.response.status === 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue("Unauthorized! Logged out..");
        }   
        return rejectWithValue(error.response.data.msg);
    }
}

///////////////
const getAllJobThunk = async (thunkAPI) => {
    const {page,searchStatus,searchType,sort,search} = thunkAPI.getState().allJobsStore
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if (search){
        url = url + `&search=${search}`
    }
    try {  
        const response = await customFetch.get(url)//,  authHeader(thunkAPI) );  
        return response.data;      
    } 
    catch (error) {  
        if (error.response.status === 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue("Unauthorized! Logged out..");
        }   
        return rejectWithValue(error.response.data.msg);
    }
}

///////////////
const deleteJobThunk = async(jobId, thunkAPI)=>{ 
    thunkAPI.dispatch(showLoading())  
    try {  
        const response = await customFetch.delete(`/jobs/${jobId}`)//, authHeader(thunkAPI) );    
        thunkAPI.dispatch(allJob())  
        return response.data.msg;      
    } 
    catch (error) {  
        thunkAPI.dispatch(hideLoading())  
        if (error.response.status === 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue("Unauthorized! Logged out..");
        }   
        return rejectWithValue(error.response.data.msg);
    }
}

/////////////////
const editJobThunk = async ({editJobId,job}, thunkAPI) => {
    try {  
        const response = await customFetch.patch(`/jobs/${editJobId}`, job)//,  authHeader(thunkAPI) );    
        thunkAPI.dispatch(handleReset())
        return response.data.msg;      
    } 
    catch (error) {  
        thunkAPI.dispatch(hideLoading())  
        if (error.response.status === 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue("Unauthorized! Logged out..");
        }   
        return rejectWithValue(error.response.data.msg);
    }
}

/////////////////
const showStatsThunk = async (thunkAPI) => {
    try {  
        const response = await customFetch.get("/jobs/stats")//,  authHeader(thunkAPI) );  
        console.log(response.data)
        return response.data;      
    } 
    catch (error) {  
        if (error.response.status === 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue("Unauthorized! Logged out..");
        }   
        return rejectWithValue(error.response.data.msg);
    }
}


export {createJobThunk, getAllJobThunk, deleteJobThunk, editJobThunk, showStatsThunk};