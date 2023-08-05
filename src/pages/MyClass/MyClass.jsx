
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MyClass = () => {
    const {user} = useAuth();
    const {data:allClass=[]} =useQuery(['allClass'],async()=>{
        const res = await fetch(`http://localhost:5000/myClass/${user?.email}`)
        return res.json();
    })
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
                        <th>Class Name</th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Enrolled Student</th>
                        <th>Feedback</th>
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
                        
                        <td>{singleClass.availableSeat}</td>
                        
                        <td>{singleClass.price}</td>
                        <td>{singleClass.status}</td>
                        <td>{singleClass?.totalEnrolledStudent}</td>
                        <td>{singleClass?.feedback}</td>
                        <th className='flex gap-2'>
                            <Link><button className="btn btn-success btn-xs">Update</button></Link>
                        </th>
                    </tr>)}

                </tbody>


            </table>
        </div>
        </div>
    );
};

export default MyClass;