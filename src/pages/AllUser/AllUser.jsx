
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';
const AllUser = () => {

    const {data:users=[],refetch} =useQuery(['users'],async()=>{
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })
    const handleMakeAdmin = user=>{
        const updatedUser = {role:'admin'}
        fetch(`http://localhost:5000/users/admin/${user._id}`,{
            
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleMakeInstructor = user=>{
        const updatedUser = {role:'admin'}
        fetch(`http://localhost:5000/users/instructor/${user._id}`,{
            
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an instructor Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div>
            <div>
            {users.length}
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Instructor</th>

                            
                        </tr>
                    </thead>
                    <tbody>
                        { users && users.map((user,index)=><tr key={user._id}>
                            <th>{index+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.role==='admin' ? 'admin' :<button onClick={()=>handleMakeAdmin(user)} className="btn  bg-green-400 text-white">Make Admin</button>}</td>
                            <td>{user.role==='instructor' ? 'instructor' :<button onClick={()=>handleMakeInstructor(user)} className="btn  bg-orange-400 text-white">Make Instructor</button>}</td>
                        </tr>)}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;