import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token
const Registration = () => {
    const [confirmPassword,setConfirmPassword] =useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile,logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        console.log(data);
        if(data.password!==confirmPassword){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Password does not match',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const photoURL = imgResponse.data.display_url;
                    createUser(data.email, data.password)
                        .then(result => {
                            const loggedUser = result.user;
                            console.log(loggedUser);
                            updateUserProfile(data.name, photoURL)
                            .then(()=>{
                                const saveUser = {name:data.name,email:data.email,image:photoURL,role:'student'}
                                fetch('http://localhost:5000/users', {
                                    method: 'POST',
                                    headers:{
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(saveUser)
                                   })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.insertedId) {
                                            reset();
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'Student created successfully',
                                                showConfirmButton: false,
                                                timer: 2500
                                            });
                                            logOut()
                                                .then(() => {
                                                    navigate('/login');
                                                })
                                                .catch(error => console.log(error))
                                        }
                                    })
                               
                            })
                            .catch(error=>console.log(error))
                        })
                        .catch(error=>console.log(error));
                }
            })
    }
    return (
        <div className="my-5">
            <h2 className="text-3xl text-center">Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name"
                            {...register("name")}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input type="email" placeholder="Email"
                            {...register("email",{required: true})}
                            className="input input-bordered w-full " />
                            {errors.email && <span className="text-red-700">email field is required</span>}
                    </div>
                </div>
                <div className="flex">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        <input type="password" placeholder="Password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern:/(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/
                            })} 
                            className="input input-bordered w-full"
                        />
                           {errors.password?.type === 'required' && <span className="text-red-700">password field is required</span>}
                           {errors.password?.type === 'minLength' && <span className="text-red-700">password must be 6 characters</span>}
                           {errors.password?.type==='pattern' && <span className="text-red-700">password must have one uppercase and one special character</span>}
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Confirm Password*</span>
                        </label>
                        <input type="password"
                         placeholder="confirm Password"
                        className="input input-bordered w-full"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        
                    </div>
                    
                </div>
                <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file"
                        {...register("image")}
                        className="file-input file-input-bordered w-full" />
                    </div>
                <div className="text-center">
                    <input type="submit" className="btn btn-block hover:bg-slate-800 bg-black text-white  my-4 " value="Add" />
                </div>
            </form>
            <p>Already have an account <Link to='/login' className="text-red">Login</Link></p>
        
        </div>
    );
};

export default Registration;