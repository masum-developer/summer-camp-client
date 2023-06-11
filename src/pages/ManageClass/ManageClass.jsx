import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
const ManageClass = () => {
    const {data:allClass=[]} =useQuery(['allClass'],async()=>{
        const res = await fetch('http://localhost:5000/allClass')
        return res.json();
    })
    const navigate = useNavigate();
    const handleApprove = singleClass=>{
        const updatedClass = {status:'approve'}
        fetch(`http://localhost:5000/class/approve/${singleClass._id}`,{
            
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(updatedClass)
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount){
                navigate(`/class/${singleClass._id}`) 
            }
        })
    }
    const handleDenied = singleClass=>{
        
        fetch(`http://localhost:5000/class/denied/${singleClass._id}`,{
            
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount){
                navigate(`/class/${singleClass._id}`) 
            }
        })
    }
    return (

        <div>
            <h2>No of Classes: {allClass.length}</h2>
            <div className="overflow-x-auto">
            <table className="table">

                <thead>
                    <tr>
                        <th>
                            sl
                        </th>
                        <th>Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                { allClass && allClass.map((singleClass,index)=><tr key={singleClass._id}>
                    
                        <td>{index+1}</td>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={singleClass.image} alt="Class" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{singleClass.name}</div>

                                </div>
                            </div>
                        </td>
                        <td>{singleClass.instructorName}</td>
                        <td>
                        {singleClass.instructorEmail}
                        </td>
                        <td>{singleClass.availableSeat}</td>
                        
                        <td>{singleClass.price}</td>
                        <td>{singleClass.status}</td>
                        <th className='flex gap-2'>
                            {
                                singleClass.status==="approve"? <button disabled className="btn btn-success btn-xs">Approve</button>:<button onClick={()=>handleApprove(singleClass)} className="btn btn-success btn-xs">Approve</button>
                            }
                            {
                                singleClass.status==="denied"?<button disabled className="btn btn-error btn-xs">Denied</button>:
                                <button onClick={()=>handleDenied(singleClass)} className="btn btn-error btn-xs">Denied</button>

                            }
                            
                            
                        </th>
                    </tr>)}

                </tbody>


            </table>
        </div>
        </div>
    );
};

export default ManageClass;