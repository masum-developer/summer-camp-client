import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from '../../hooks/useAuth';
const img_hosting_token = import.meta.env.VITE_Image_Upload_token
const AddClass = () => {
    const {user} = useAuth();
    console.log(user?.email);
    const { register, handleSubmit, reset} = useForm();
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
                    const saveClass = { name: data.name, image: photoURL, instructorName:user.displayName,instructorEmail:user.email,availableSeat:data.availableSeat,price:data.price,status:'pending',feedback:''}
                    fetch('http://localhost:5000/addclass', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(saveClass)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                            }
                        })
                }
            })

    }

    return (
        <div className="my-5">
            <h2 className="text-3xl text-center">Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex my-5">
                <div className="form-control w-full">
                        <h2>InstructorName: {user?.displayName}</h2>
                    </div>
                    <div className="form-control w-full ml-4">
                        <h2>Email: {user?.email}</h2>
                    </div>
                    
                </div>
                <div className="flex">
                <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="name" placeholder="Class Name"
                            {...register("name",{required: true})}
                            className="input input-bordered w-full " />
                            
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
                <div className="flex">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Available Seat</span>
                        </label>
                        <input type="number" placeholder="availableSeat"
                            {...register("availableSeat")}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" placeholder="Price"
                            {...register("price",{required: true})}
                            className="input input-bordered w-full " />
                            
                    </div>
                </div>
                
                <div className="text-center">
                    <input type="submit" className="btn btn-block hover:bg-slate-800 bg-black text-white  my-4 " value="Add Class" />
                </div>
            </form>
            
        
        </div>
    );
};

export default AddClass;