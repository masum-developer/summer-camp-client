
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { FaEyeSlash, FaEye } from "react-icons/fa";
const Login = () => {
    const [open,setOpen] = useState(true)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const {logIn} = useContext(AuthContext);
    const handleShow = ()=>{
        setOpen(false)
    }
    const handleHide = ()=>{
        setOpen(true)
    }
    const onSubmit = data => {
        console.log(data)
        logIn(data.email,data.password)
        .then(loggedUser=>{
            console.log(loggedUser);
            navigate('/');
        })
        .catch(error=>console.log(error))
    };
    return (
        <div className="my-5">
            <h2 className="text-3xl text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                    
                    <div className="form-control w-full mr-4">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input type="email" placeholder="Email"
                            {...register("email")}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full mr-4 ">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        {
                            open?<input type="password" placeholder="Password"
                            {...register("password")}
                            className="input input-bordered w-full"
                        />:<input type="text" placeholder="Password"
                        {...register("password")}
                        className="input input-bordered w-full"
                    />
                        }
                        
                        
                        
                    </div>
                    <div className="mt-8">
                    {
                       open?<button onClick={handleShow} className="btn btn-circle btn-outline"><FaEye></FaEye></button>:<button onClick={handleHide} className="btn btn-circle btn-outline"><FaEyeSlash></FaEyeSlash></button>
                    }
                    </div>
                    
                </div>
                
                <div className="text-center">
                    <input type="submit" className="btn btn-block hover:bg-purple-900 bg-black text-white  my-4 " value="Login" />
                </div>
            </form>
            <p>New to Martial Art Academy <Link to='/register'>Register</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;