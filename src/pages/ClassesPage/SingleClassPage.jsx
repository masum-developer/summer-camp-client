import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useCart from "../../hooks/useCart";

const SingleClassPage = ({ singleClass }) => {


    const { user,loading } = useAuth();
    const [,refetch] = useCart();
    const location = useLocation();
    const navigate = useNavigate();
  
    const { data: usr = [] } = useQuery({
        queryKey: ['usr'],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            return res.json();
        },
    })

    
    const { _id, image, name, instructorName, availableSeat, price } = singleClass;
    const [open, setOpen] = useState(false)
    let color = "base"
    if (availableSeat === 0) {
        color = 'red';
        setOpen(true);
    }

    const handleAddToCart = singleClass => {
        console.log(singleClass);
        if (user && user.email) {
            const cartItem = { selectClassId: _id, name, image, price, email: user.email, instructorName }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: ' Class added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to select the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div style={{'backgroundColor':color}} className="first-letter:card card-compact w-96 shadow-xl">
        <figure><img src={image} className="w-full" alt="Class" /></figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>Instructor: {instructorName}</p>
            <p>Available Seat: {availableSeat}</p>
            <p>Price: {price}</p>
            <div className="card-actions justify-end">
                {
                    (usr[0]?.role==='admin' || usr[0]?.role==='instructor')? <button disabled className="btn btn-primary">Select</button>:
                    
                    <button onClick={()=>handleAddToCart(singleClass)} disabled={open}  className="btn btn-primary">Select</button>
                }
                
            </div>
        </div>
    </div>
    );
};

export default SingleClassPage;