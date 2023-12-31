import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, Logo, SubmitBtn } from "../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {registerUser } from "../features/user/userSlice";





const initialState = {
  name:'',
  email:'',
  password:'',
  isMember: true,
}


const Register = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [values,setValues] = useState(initialState);
  const {user,isLoading} = useSelector((state) => state.userStore);

  const handleChange = (event) => {
    setValues({...values, [event.target.name] : event.target.value })
  } 

  const handleSubmit = () => {
    const {name,email,password} = values;
    if (!name || !email || !password){      
      toast.error("please fill all fields")      
      return;
    }   
    return dispatch(registerUser({name,email,password}));        
    
  }

  useEffect( () => {
      if (user){
      setTimeout(() => {
        navigate("/")
      }, 1000);
      }
    },[user]
  )



  
  return (
    <section className="h-screen grid place-items-center">
        <Form onSubmit={handleSubmit} className="card w-80 px-4 pt-4 pb-8 bg-base-100 shadow-lg flex flex-col gap-y-6 border-t-4 border-blue-400">
            <div className="self-center"><Logo /></div>
            <h4 className="text-center font-bold text-3xl">Register</h4>
            <div>            
                <FormInput type="text" name="name" label="name " changeVal={handleChange} value={values.name} />
                <FormInput type="email" name="email" label="email" changeVal={handleChange} value={values.email} />
                <FormInput type="password" name="password" label="password"  changeVal={handleChange} value={values.password}/>
            </div>            
            <div className="mt-4">
                <SubmitBtn text="Register" isLoading={isLoading}/>            
            </div>            
            <p className="text-center">
                Already a member? <Link to="/login" className="ml-2 link link-hover link-primary capitalize">login</Link>
            </p>
        </Form>
    </section>
    )
  
}






export default Register;