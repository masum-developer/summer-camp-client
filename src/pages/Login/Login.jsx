
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const {logIn} = useContext(AuthContext);
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
                <div className="flex">
                    
                    <div className="form-control w-full mr-4">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input type="email" placeholder="Email"
                            {...register("email")}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        <input type="password" placeholder="Password"
                            {...register("password")}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                
                <div className="text-center">
                    <input type="submit" className="btn btn-block hover:bg-purple-900 bg-black text-white  my-4 " value="Login" />
                </div>
            </form>
        </div>
    );
};

export default Login;