import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageClassStatus = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm();
    
    const onSubmit = data => {
        console.log(id);
        const updatedClass = {feedback:data.feedback}
        fetch(`https://martialart-academy-server.vercel.app/class/feedback/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(updatedClass)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                Swal.fire({
                    title: 'Success',
                    text: 'Update done',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  navigate('/dashboard/manageClass')
            }
        })
    }
    return (
        <div>
            <h2>Remarks</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="border-4 border-black pl-20 py-5 mb-5">
            <textarea placeholder="Details" className="form-control px-3 py-2 border-2 border-black mt-5"
                {...register("feedback", { required: true })}>
                     
                </textarea>
                <div className="text-center">
                    <input type="submit" className="btn btn-block hover:bg-slate-800 bg-black text-white  my-4 " value="Add Class" />
                </div>
            </form>
            
        </div>
    );
};

export default ManageClassStatus;