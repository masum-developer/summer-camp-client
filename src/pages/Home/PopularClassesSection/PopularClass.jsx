import { useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const PopularClass = ({popularClass}) => {
    const {_id,name,image,price,instructorName,availableSeat} = popularClass;

    const { user} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
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
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><img src={image} alt="Class Image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Pice: ${price}</p>
                <p>Instructor Name: {instructorName}</p>
                <p>Available Seat: {availableSeat}</p>
                <div className="card-actions justify-center">
                    <button onClick={()=>handleAddToCart(popularClass)} className="btn bg-black hover:bg-slate-800 text-white">Select</button>
                </div>
            </div>
        </div>
    );
};

export default PopularClass;