import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token
const Registration = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, updateUserProfile} = useContext(AuthContext);
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {

        console.log(data);
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
                            .then(()=>{})
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
                            <span className="label-text">Name*</span>
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
                            {...register("email")}
                            className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="flex">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        <input type="password" placeholder="Password"
                            {...register("password")}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Image*</span>
                        </label>
                        <input type="file"
                        {...register("image", { required: true })}
                        className="file-input file-input-bordered w-full" />
                    </div>
                </div>



                <div className="text-center">
                    <input type="submit" className="btn btn-block hover:bg-green-900 bg-black text-white  my-4 " value="Add" />
                </div>
            </form>
        </div>
    );
};

export default Registration;