import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { FaPaypal, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();
    console.log(cart);
    
    const handleDelete = singleClass =>{
        console.log(singleClass)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${singleClass._id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.deletedCount>0){
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your Class has been deleted.',
                            'success'
                          )
                    }
                })
              
            }
          })
    }
    return (
        <>
            <div className="uppercase">
                <h2 className="text-2xl">Total Class: {cart.length}</h2>
                
            </div>
            <div>
            <div className="overflow-x-auto">
                <table className="table">
                    
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart && cart.map((singleClass, index) => <tr key={singleClass._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={singleClass.image} alt="Food" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {singleClass.name}
                                </td>
                                <td className="text-end">${singleClass.price}</td>
                                <td>
                                    <button onClick={()=>handleDelete(singleClass)} className="btn  bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button>
                                <Link to={`/payment/${singleClass.price}`}>
                                    
                                <button className="btn  bg-orange-600 text-white ml-3" ><FaPaypal></FaPaypal></button>
                                </Link>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
};

export default MyCart;